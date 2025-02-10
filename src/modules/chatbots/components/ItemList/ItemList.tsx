"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Chatbot } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Check, Clipboard, Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ItemList = ({
  bot,
  handleDelete,
  index,
}: {
  bot: Chatbot;
  handleDelete: (id: string) => void;
  index: number;
}) => {
  const router = useRouter();
  const embedCode = `<iframe src="${window.location.origin}/bot/${bot.id}" style="width: 100%; height: 600px; border: none; position: sticky; bottom: 0; z-index: 50;"></iframe>`;
  const [copied, setCopied] = useState(false);

  const CopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">{bot.name}</h2>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        router.push(
                          `/preview/${index % 2 == 0 ? 1 : 2}/${bot.id}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Preview</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/chatbots/${bot.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(bot.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor={`embed-code-${bot.id}`}
              className="text-sm font-medium text-muted-foreground"
            >
              Embed Code
            </label>
            <div className="flex items-center space-x-2">
              <input
                id={`embed-code-${bot.id}`}
                className="flex-1 px-3 py-2 text-sm bg-muted rounded-md font-mono"
                value={embedCode}
                readOnly
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => CopyCode(embedCode)}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemList;
