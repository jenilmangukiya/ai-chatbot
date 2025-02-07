import EditChatBot from "@/modules/chatbots/EditChatBot/EditChatBot";
import React from "react";

const page = async ({ params }: { params: Promise<{ chatbotId: string }> }) => {
  const { chatbotId } = await params;

  return <EditChatBot chatbotId={chatbotId} />;
};

export default page;
