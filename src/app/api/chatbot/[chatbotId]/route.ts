import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { chatbotId: string } }
) {
  const apiParams = await params;
  const chatbotId = apiParams.chatbotId;
  try {
    const chatbot = await prismaClient.chatbot.findUnique({
      where: { id: chatbotId },
    });

    if (!chatbot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, chatbot }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chatbot:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatbotId: string } }
) {
  const apiParams = await params;
  const chatbotId = apiParams.chatbotId;
  try {
    await prismaClient.chatbot.delete({
      where: { id: chatbotId },
    });

    return NextResponse.json(
      { success: true, message: "Chatbot deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chatbot:", error);
    return NextResponse.json(
      { error: "Chatbot not found or cannot be deleted" },
      { status: 404 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { chatbotId: string } }
) {
  const apiParams = await params;
  const chatbotId = apiParams.chatbotId;
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const knowledge = formData.get("knowledge") as string;
    const starterMessage = formData.get("starterMessage") as string;
    const openAiApiKey = formData.get("openAiApiKey") as string;
    const botLogo = formData.get("botLogo") as string;
    const themeConfig = formData.get("themeConfig");

    let parsedThemeConfig = {};
    if (typeof themeConfig === "string") {
      try {
        parsedThemeConfig = JSON.parse(themeConfig);
      } catch (error) {
        console.error("Error updating chatbot:", error);
        return NextResponse.json(
          { error: "Invalid themeConfig JSON" },
          { status: 400 }
        );
      }
    }

    const chatbot = await prismaClient.chatbot.update({
      where: { id: chatbotId },
      data: {
        name: name || undefined,
        knowledge: knowledge || undefined,
        starterMessage: starterMessage || undefined,
        openAiApiKey: openAiApiKey || undefined,
        botLogo: botLogo || undefined,
        themeConfig: Object.keys(parsedThemeConfig).length
          ? parsedThemeConfig
          : undefined,
      },
    });

    return NextResponse.json({ success: true, chatbot }, { status: 200 });
  } catch (error) {
    console.error("Error updating chatbot:", error);
    return NextResponse.json(
      { error: "Chatbot not found or cannot be updated" },
      { status: 404 }
    );
  }
}
