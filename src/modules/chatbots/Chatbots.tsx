"use client";

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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ItemList from "./components/ItemList/ItemList";
import Header from "@/components/Header/Header";
import Loader from "@/components/Loader/Loader";
import useChatBots from "./useChatBots";

export default function ChatbotList() {
  const router = useRouter();
  const {
    handleSearch,
    search,
    setSearch,
    loading,
    error,
    chatbots,
    handleDelete,
    totalPages,
    page,
    setPage,
  } = useChatBots();

  return (
    <div className="container mx-auto p-6">
      <Header />

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Search chatbots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="font-bold">
          Search
        </Button>
        <Button
          onClick={() => router.push("/chatbots/add")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold"
        >
          <Plus />
          Add new bot
        </Button>
      </form>

      {/* Loading & Error Handling */}
      {loading && <Loader className="h-[500px] w-full" />}
      {error && <p className="text-red-500">{error}</p>}

      {/* Chatbot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {!loading &&
          chatbots.map((bot, index) => (
            <ItemList
              bot={bot}
              handleDelete={handleDelete}
              key={bot.id}
              index={index}
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
