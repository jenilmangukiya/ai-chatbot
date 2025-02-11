"use client";

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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import useAddChatbot from "./useAddChatbot";

const AddChatbot = () => {
  const {
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
  } = useAddChatbot();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mb-24">
      <div className="container mx-auto p-6">
        <Header />

        <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
          {/* Basic Information */}
          <div>
            <form autoComplete="off" className="space-y-4">
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
                  autoComplete="new-password"
                  name="project-name"
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
                  autoComplete="new-password"
                  name="api-key"
                />
              </div>
            </form>
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
              href="/chatbots"
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

export default AddChatbot;
