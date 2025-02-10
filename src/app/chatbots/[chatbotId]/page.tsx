import ProtectedRoute from "@/components/Auth/ProtectedRoute/ProtectedRoute";
import EditChatBot from "@/modules/chatbots/EditChatBot/EditChatBot";
import React from "react";

const page = async ({ params }: { params: Promise<{ chatbotId: string }> }) => {
  const { chatbotId } = await params;

  return (
    <ProtectedRoute>
      <EditChatBot chatbotId={chatbotId} />
    </ProtectedRoute>
  );
};

export default page;
