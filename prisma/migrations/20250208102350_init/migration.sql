-- CreateTable
CREATE TABLE "Chatbot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "knowledge" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "themeConfig" JSONB NOT NULL,
    "starterMessage" TEXT NOT NULL,
    "openAiApiKey" TEXT NOT NULL,
    "botLogo" TEXT,

    CONSTRAINT "Chatbot_pkey" PRIMARY KEY ("id")
);
