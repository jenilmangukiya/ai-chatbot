import { useState, useRef, useEffect } from "react";

import { toast } from "@/hooks/use-toast";

const useEditChatBot = ({ chatbotId }: { chatbotId: string }) => {
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

  // Fetch existing chatbot data when component mounts
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
          setName(data.chatbot.name || "");
          setStarterMessage(data.chatbot.starterMessage || "");
          setKnowledgeBase(data.chatbot.knowledge || "");

          // Parse theme config
          if (data.chatbot.themeConfig) {
            const themeConfig = data.chatbot.themeConfig;
            setBorderColor(themeConfig.borderColor || "#6366f1");
            setBackColor(themeConfig.backgroundColor || "#ffffff");
          }
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

  const UpdateChatBot = async () => {
    if (!chatbotId) {
      toast({
        title: "No Chatbot ID provided for update",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim()) {
      toast({ title: "Please enter a name", variant: "destructive" });
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("knowledge", knowledgeBase);
    formData.append("starterMessage", starterMessage);

    // Only append API key if it's been changed
    if (apiKey.trim()) {
      formData.append("openAiApiKey", apiKey);
    }

    // Append logo if a new one is selected
    if (logo) {
      formData.append("botLogo", logo);
    }

    formData.append(
      "themeConfig",
      JSON.stringify({
        borderColor: borderColor,
        backgroundColor: backColor,
      })
    );

    try {
      setIsLoading(true);
      const response = await fetch(`/api/chatbot/${chatbotId}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLink(`${window.location.origin}/chatbot/${data.chatbot.id}`);
        toast({ title: "Chatbot updated successfully" });
      } else {
        toast({ title: "Failed to update chatbot" });
      }
    } catch (err) {
      console.error("Error updating chatbot: ", err);
      toast({ title: "Failed to update chatbot", variant: "destructive" });
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
        toast({ title: "Knowledge extracted successfully" });
      } else {
        toast({ title: "Failed to extract the text", variant: "destructive" });
      }
    } catch (err) {
      console.error("Failed to extract the text: ", err);
      toast({ title: "Failed to extract the text", variant: "destructive" });
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
    UpdateChatBot,
    isLoading,
  };
};

export default useEditChatBot;
