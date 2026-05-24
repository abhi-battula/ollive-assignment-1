import type { Request, Response } from "express";
import { streamChatResponse } from "../services/chat-service";

export async function sendMessage(req: Request, res: Response) {
  try {

    const { message, conversationId, provider } = req.body; 

    const stream = await streamChatResponse({
      message,
      conversationId,
      provider,
    });


    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate response",
    });
  }
}