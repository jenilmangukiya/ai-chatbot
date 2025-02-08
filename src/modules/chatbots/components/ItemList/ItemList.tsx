import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Chatbot } from "@prisma/client";

import { Clipboard, Edit } from "lucide-react";
import router from "next/router";
import React from "react";

const ItemList = ({
  bot,
  handleCopyCode,
}: {
  bot: Chatbot;
  handleCopyCode: (code: string) => void;
}) => {
  const embedCode = `<iframe src="${window.location.origin}/bot/${bot.id}" style="width: 100%; height: 600px; border: none; position: absolute; bottom: 0; z-index: 50;"></iframe>`;

  return (
    <Card key={bot.id} className="shadow-lg">
      <CardContent className="p-4 flex flex-row items-center justify-between gap-2">
        <h2 className="text-lg font-semibold w-[120px]">{bot.name}</h2>

        {/* Embed Code Column */}
        <div className="flex-1 flex items-center ">
          <span className="text-sm font-medium  mr-2">Embed Code:</span>
          <div className="flex-1  rounded flex items-center justify-between px-3 py-1 border border-gray-200 pl-4">
            <code className="text-sm ">{embedCode}</code>
            <button
              onClick={() => handleCopyCode(embedCode)}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 ml-2"
              title="Copy to clipboard"
            >
              <>
                <Clipboard className="w-5 h-5" />
              </>
            </button>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            className="bg-blue-500 text-white"
            onClick={() => router.push(`/chatbots/${bot.id}`)}
          >
            <Edit /> Edit
          </Button>
          <Button className="bg-red-600 color-white">Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemList;
