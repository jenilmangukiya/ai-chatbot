"use client";
import { useState, useRef } from "react";

import {
  Upload,
  Bot,
  Palette,
  MessageSquare,
  Code,
  ArrowLeft,
  Clipboard,
  CheckCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ChatBotAdminPanel = () => {
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

  const router = useRouter();

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
        setLink(`${window.location.origin}/bot/${data.chatbot.id}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 mb-24">
      <div className="max-w-[90%] mx-auto">
        <div className="flex flex-row justify-between mb-6">
          <div
            className={`transition-all duration-1000 ease-out ${"opacity-100 translate-y-0"} flex justify-center items-center gap-2`}
          >
            <Bot className="w-12 h-12 mx-auto text-blue-400" />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              K-Bot
            </h1>
          </div>
          <Button onClick={() => router.push("/chatbots")}>
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Button>
        </div>

        <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                OpenAI API Key
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Bot className="w-5 h-5 text-indigo-600" />
                Bot Logo
              </h3>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onClick={() => inputLogoFile.current?.click()}
              >
                <input
                  type="file"
                  ref={inputLogoFile}
                  className="hidden"
                  onChange={(e: any) => setLogo(e.target.files?.[0])}
                  accept=".png,.jpg,.jpeg"
                />
                <p className="text-sm text-gray-600 mb-2">
                  {logo ? logo.name : "Drag and drop or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  Limit 200MB per file. PNG, JPG, JPEG
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Upload className="w-5 h-5 text-indigo-600" />
                Knowledge Base
              </h3>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onClick={() => inputDocumentFile.current?.click()}
              >
                <input
                  type="file"
                  ref={inputDocumentFile}
                  className="hidden"
                  onChange={(e) => setDocument(e.target.files?.[0])}
                  accept=".txt,.json,.yaml,.pdf"
                />
                <p className="text-sm text-gray-600 mb-2">
                  {document
                    ? document.name
                    : "Drag and drop or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  Limit 200MB per file. TXT, JSON, YAML
                </p>
              </div>
              <Button
                className="w-full"
                onClick={extractText}
                disabled={!document}
              >
                Extract text
              </Button>
            </div>
          </div>
          <div className="space-y-4 grid-cols-2 w-full">
            <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Knowladge base
            </h3>
            <textarea
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              placeholder="You are an customer server agent. you need to help people for it."
            />
          </div>

          {/* Color Theme and Message Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Palette className="w-5 h-5 text-indigo-600" />
                Color Theme
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Border Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 rounded cursor-pointer"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Background Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 rounded cursor-pointer"
                    value={backColor}
                    onChange={(e) => setBackColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Default Message
              </h3>
              <textarea
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={4}
                value={starterMessage}
                onChange={(e) => setStarterMessage(e.target.value)}
                placeholder="Hello! How can I assist you today?"
              />
            </div>
          </div>

          {/* Generated Link Section */}
          {link && (
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <span className="text-sm font-mono text-gray-700">{link}</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Clipboard className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Link
              href="/list"
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
            <button
              onClick={GenerateChatBot}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⚪</span>
                  Generating...
                </>
              ) : (
                <>
                  <Code className="w-4 h-4" />
                  Generate Chatbot
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotAdminPanel;
