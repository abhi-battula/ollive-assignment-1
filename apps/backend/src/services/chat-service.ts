import { prisma } from "../../db";
import { generateText } from "../sdk/llm.sdk";
import { type ChatRole, type LLMMessage } from "../types/chat-types";

type StreamChatOptions = {
    message: string;
    conversationId: string;
    provider: "gemini";
};

export async function* streamChatResponse(
    options: StreamChatOptions
) {

    

    //save user message
    await prisma.message.create({
        data: {
            content: options.message,
            role: "user",
            conversationId: options.conversationId
        }
    })

    // fetch recent messages
    const dbMessages  = await prisma.message.findMany({
        where: {
            conversationId: options.conversationId
        },
        orderBy: {
            createdAt: "asc"
        },
        take: 10
    })
    

    // Convert DB messages -> LLM messages
  const llmMessages: LLMMessage[] = dbMessages.map((message) => ({
    role: message.role as ChatRole,
    content: message.content,
  }));
  

  //  call sdk
    const stream = await generateText({
      provider: options.provider,
      messages: llmMessages,
      conversationId: options.conversationId,
      model: "gemini-2.5-flash"
    });

   
  let assistantResponse = "";

  // Stream chunks
  for await (const chunk of stream) {

    const text = chunk.text || "";

    assistantResponse += text;

    yield text;
  }

  // Save assistant response
  await prisma.message.create({
    data: {
      content: assistantResponse,
      role: "assistant",
      conversationId: options.conversationId,
    },
  });
}