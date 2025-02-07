import React from "react";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
  themeConfig: {
    backgroundColor: string;
    borderColor: string;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  themeConfig,
}) => {
  const isBot = message.isBot;

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isBot ? "bg-white border-2" : "text-white"
        }`}
        style={{
          borderColor: isBot ? themeConfig.borderColor : "transparent",
          backgroundColor: isBot ? "white" : themeConfig.backgroundColor,
        }}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-50 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
