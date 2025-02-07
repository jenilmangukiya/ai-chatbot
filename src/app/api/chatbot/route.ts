import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // try {
  const formData = await req.formData();

  // Extract form fields
  const name = formData.get("name") as string;
  const knowledge = formData.get("knowledge") as string;
  const starterMessage = formData.get("starterMessage") as string;
  const openAiApiKey = formData.get("openAiApiKey") as string;
  const botLogo = formData.get("botLogo") as string; // Expecting URL
  const themeConfig = formData.get("themeConfig"); // JSON string

  console.log({
    name,
    knowledge,
    starterMessage,
    openAiApiKey,
    botLogo,
    themeConfig,
  });

  if (!name || !knowledge || !starterMessage || !openAiApiKey) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Parse themeConfig if it's a stringified JSON
  let parsedThemeConfig = {};
  if (typeof themeConfig === "string" && themeConfig) {
    try {
      parsedThemeConfig = JSON.parse(themeConfig);
    } catch (error: any) {
      console.error("Error while creating chatbot:", error);
      return NextResponse.json(
        { error: "Invalid themeConfig JSON" },
        { status: 400 }
      );
    }
  }

  // Save chatbot to the database
  const chatbot = await prismaClient.chatbot.create({
    data: {
      name,
      knowledge,
      starterMessage,
      openAiApiKey,
      botLogo: "botLogo" || null,
      themeConfig: parsedThemeConfig,
    },
  });

  return NextResponse.json({ success: true, chatbot }, { status: 201 });
  // } catch (error) {
  //   console.error("Error creating chatbot:", error);
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
}

// GET: List chatbots with pagination and search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get pagination and search query parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";

    // Calculate offset for pagination
    const skip = (page - 1) * limit;

    // Fetch chatbots with search and pagination
    const chatbots = await prismaClient.chatbot.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } }, // Case-insensitive search by name
          { knowledge: { contains: search, mode: "insensitive" } }, // Search in knowledge
        ],
      },
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" }, // Sort by newest first
    });

    // Get total chatbot count for pagination info
    const totalChatbots = await prismaClient.chatbot.count({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { knowledge: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(totalChatbots / limit),
      totalChatbots,
      chatbots,
    });
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
