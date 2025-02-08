"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ItemList from "./components/ItemList/ItemList";
import { Chatbot } from "@prisma/client";

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchChatbots();
  }, [page, search]);

  const fetchChatbots = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/chatbot?page=${page}&limit=5&search=${search}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch chatbots");
      setChatbots(data.chatbots);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchChatbots();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);

        toast({
          variant: "destructive",
          title: "Failed to copy to clipboard",
        });
      });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chatbot?")) return;

    try {
      const res = await fetch(`/api/chatbot/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete chatbot");
      toast({
        title: "Chatbot deleted successfully",
      });
      fetchChatbots();
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Failed to delete chatbot",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between mb-6">
        <div
          className={`transition-all duration-1000 ease-out ${"opacity-100 translate-y-0"} flex justify-center items-center gap-2`}
        >
          <Bot className="w-12 h-12 mx-auto text-blue-400" />
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            K-Bot
          </h1>
        </div>
        <Button onClick={() => router.push("/chatbots/add")}>
          Add new Bot
        </Button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Search chatbots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Loading & Error Handling */}
      {loading && <p>Loading chatbots...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Chatbot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {chatbots.map((bot) => (
          <ItemList
            bot={bot}
            handleCopyCode={handleCopyCode}
            handleDelete={handleDelete}
            key={bot.id}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => setPage(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
