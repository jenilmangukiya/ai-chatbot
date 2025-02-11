import { useState, useEffect } from "react";

import { toast } from "@/hooks/use-toast";

import { Chatbot } from "@prisma/client";

const useChatBots = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchChatbots();
  }, [page, search]);

  const fetchChatbots = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/chatbot?page=${page}&limit=3&search=${search}`
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
  return {
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
  };
};

export default useChatBots;
