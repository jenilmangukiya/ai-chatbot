import { openAI } from "@/lib/openAI";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    console.log("messages", messages);
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Generate a response considering the conversation history
    const { text } = await generateText({
      model: openAI("gpt-4o-mini"),
      messages,
    });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
