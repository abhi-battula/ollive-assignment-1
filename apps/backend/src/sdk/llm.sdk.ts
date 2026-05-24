
import { generateGeminiResponse } from "../providers/gemini.provider";
import type { LLMMessage } from "../types/chat-types";
import type { InferenceLogInput, } from "../types/inference-types";

type GenerateOptions = {
  provider: "gemini";
  model: string;
  messages: LLMMessage[];
  conversationId: string;
};

export async function generateText(options: GenerateOptions) {

  const start = Date.now();
  const inputPreview = options.messages.map((message) => message.content).join(" ").slice(0, 200);
  try {
    // call provider
    const stream = await generateGeminiResponse(options.messages,options.model);

    // initial latency
    const latency = Date.now() - start;
    

    // create log
    const log: InferenceLogInput = {
      provider: options.provider,
      model: options.model,
      latencyMs: latency,
      status: "success",
      conversationId: options.conversationId,
      createdAt: new Date().toISOString(),
      inputPreview,
    };

    // hit the endpoint
    void sendInferenceLog(log);

    console.log({
      provider: options.provider,
      model: options.model,
      latency,
      conversationId: options.conversationId,
      status: "success",
    });

    return stream;

  } catch (error) {

    console.error({
      provider: options.provider,
      model: options.model,
      conversationId: options.conversationId,
      status: "error",
      error,
    });

    // error log
    const errorLog: InferenceLogInput = {
      provider: options.provider,
      model: options.model,
      latencyMs: Date.now() - start,
      status: "error",
      conversationId: options.conversationId,
      createdAt: new Date().toISOString(),
      errorMessage: error instanceof Error ? error.message : "Unknown Error",
      inputPreview
    };

    // hit the end point
    void sendInferenceLog(errorLog);

    throw error;
  }
}

export async function sendInferenceLog( log: InferenceLogInput ) {

  try {

    await fetch(
      process.env.INGESTION_URL!,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(log),
      }
    );

  } catch (error) {

    console.error(
      "Failed to send inference log",
      error
    );
  }
}