"use client";
import { useState, useRef } from "react";

import { toast } from "@/hooks/use-toast";

const useAddChatbot = () => {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [borderColor, setBorderColor] = useState("#6366f1");
  const [backColor, setBackColor] = useState("#ffffff");
  const [starterMessage, setStarterMessage] = useState("");
  const [document, setDocument] = useState<any>(null);
  const [logo, setLogo] = useState<any>(null);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");

  const inputDocumentFile: any = useRef(null);
  const inputLogoFile: any = useRef(null);

  const GenerateChatBot = async () => {
    if (!name.trim()) {
      toast({ title: "Please enter a name", variant: "destructive" });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    if (!knowledgeBase.trim()) {
      toast({
        title: "Please select a knowledge base file",
        variant: "destructive",
      });
      return;
    }

    if (!logo) {
      toast({ title: "Please select a bot logo", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("knowledge", knowledgeBase);
    formData.append("starterMessage", starterMessage);
    formData.append("openAiApiKey", apiKey);
    formData.append("botLogo", logo);
    formData.append(
      "themeConfig",
      JSON.stringify({
        borderColor: borderColor,
        backgroundColor: backColor,
      })
    );

    try {
      setIsLoading(true);
      const response = await fetch("/api/chatbot", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLink(`${window.location.origin}/embeded/${data.chatbot.id}`);
        toast({ title: "Chatbot generated successfully" });
      } else {
        toast({ title: "Failed to generate chatbot" });
      }
    } catch (err) {
      console.error("Error generating chatbot: ", err);
      toast({ title: "Failed to generate chatbot", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const extractText = async () => {
    if (!document) return;
    try {
      const formData = new FormData();
      formData.append("file", document);
      const response = await fetch("/api/chatbot/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setKnowledgeBase(data.textContent);
        toast({ title: "Knowladge extracted successfully" });
      } else {
        toast({ title: "Failed Extract the text", variant: "destructive" });
      }
    } catch (err) {
      console.error("Failed Extract the text: ", err);
      toast({ title: "Failed Extract the text", variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return {
    name,
    setName,
    apiKey,
    setApiKey,
    inputLogoFile,
    setLogo,
    logo,
    inputDocumentFile,
    document,
    setDocument,
    extractText,
    knowledgeBase,
    setKnowledgeBase,
    borderColor,
    setBorderColor,
    backColor,
    starterMessage,
    setBackColor,
    link,
    setStarterMessage,
    copyToClipboard,
    copied,
    isLoading,
    GenerateChatBot,
  };
};

export default useAddChatbot;
