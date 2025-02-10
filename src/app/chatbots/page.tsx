"use client";
import ProtectedRoute from "@/components/Auth/ProtectedRoute/ProtectedRoute";
import ChatbotList from "@/modules/chatbots/Chatbots";

export default function page() {
  return (
    <ProtectedRoute>
      <ChatbotList />
    </ProtectedRoute>
  );
}
