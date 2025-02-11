import { EmbededBot } from "@/modules/embeded/EmbededBot/EmbededBot";
import React from "react";

const page = async ({ params }: { params: Promise<{ chatbotId: string }> }) => {
  const { chatbotId } = await params;
  return <EmbededBot chatbotId={chatbotId} />;
};

export default page;
