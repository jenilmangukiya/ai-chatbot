/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { ChatbotConfig, Message } from "./types";
import { ChatMessage } from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

interface ChatbotProps {
  chatbotId: string;
}

// Mock data for development
const MOCK_CONFIG: ChatbotConfig = {
  id: "cde227ba-2134-4620-9a3d-7d23d0260bb6",
  name: "Customer Service Bot",
  knowledge:
    "You are a customer service bot. Please provide answers to user questions.",
  createdAt: "2025-02-07T13:31:31.975Z",
  updatedAt: "2025-02-07T13:31:31.975Z",
  themeConfig: {
    borderColor: "#582cf2",
    backgroundColor: "#6c8d90",
  },
  starterMessage: "👋 Hi! I'm here to help. How can I assist you today?",
  openAiApiKey: "dummy-key",
  botLogo:
    "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=64&h=64&fit=crop&crop=faces",
};

// Mock API response
const mockApiResponse = (message: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        response: `This is a mock response to: "${message}". In production, this would be replaced with actual API responses.`,
      });
    }, 1000);
  });
};

export const Bot: React.FC<ChatbotProps> = ({ chatbotId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchChatbotData = async () => {
      if (!chatbotId) {
        toast({
          title: "No Chatbot ID provided",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await fetch(`/api/chatbot/${chatbotId}`);
        if (response.ok) {
          const data = await response.json();

          // Populate form with existing data
          setConfig(data.chatbot);
          setMessages([
            {
              id: uuidv4(),
              content:
                data.chatbot.starterMessage || "Hello how can i help you?",
              isBot: true,
              timestamp: new Date(),
            },
          ]);
        } else {
          toast({
            title: "Failed to fetch chatbot details",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Error fetching chatbot: ", err);
        toast({
          title: "Error fetching chatbot details",
          variant: "destructive",
        });
      }
    };

    if (chatbotId) {
      fetchChatbotData();
    }
  }, [chatbotId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !config) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Using mock API response instead of actual API call
      const data = await mockApiResponse(inputMessage);

      const botMessage: Message = {
        id: uuidv4(),
        content: data.response as string,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, I couldn't process your message. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!config) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: config.themeConfig.backgroundColor }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {isOpen && (
        <div
          className="w-[350px] h-[500px] bg-gray-50 rounded-lg shadow-xl flex flex-col"
          style={{
            borderColor: config.themeConfig.borderColor,
            borderWidth: "1px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center justify-between"
            style={{ backgroundColor: config.themeConfig.backgroundColor }}
          >
            <div className="flex items-center space-x-3">
              <img
                src={config.botLogo}
                width={32}
                height={32}
                alt="Bot Logo"
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
              <h3 className="font-medium text-white">{config.name}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-75"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                themeConfig={config.themeConfig}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2"
                style={{
                  focusRing: config.themeConfig.borderColor,
                  borderColor: config.themeConfig.borderColor,
                }}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-2 rounded-full"
                style={{ backgroundColor: config.themeConfig.backgroundColor }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
