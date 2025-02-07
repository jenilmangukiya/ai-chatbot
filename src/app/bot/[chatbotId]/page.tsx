import { Bot } from "@/modules/bot/Bot/Bot";
import React from "react";

const page = async ({ params }: { params: Promise<{ chatbotId: string }> }) => {
  const { chatbotId } = await params;
  return <Bot chatbotId={chatbotId} />;
};

export default page;
