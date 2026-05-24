import { GoogleGenAI } from "@google/genai";
import type { LLMMessage } from "../types/chat-types";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});

export async function generateGeminiResponse(messages: LLMMessage[],model:string){

     const formattedPrompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

    const stream  = await ai.models.generateContentStream({
        model,
        contents:formattedPrompt
    })

    return stream ;

} 