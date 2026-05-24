import { Worker } from "bullmq";
import IORedis from "ioredis";
import { prisma } from "./db";

const connection = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker("inference-queue", async (job) => {
  console.log("Processing Job:", job.id);
  console.log("job----->", job.data);
   await prisma.inferenceLog.create({
      data: {
        provider: job.data.provider,
        model: job.data.model,

        latencyMs: job.data.latencyMs,

        status: job.data.status,

        errorMessage: job.data.errorMessage,

        conversationId: job.data.conversationId,

        createdAt: new Date(job.data.createdAt),
        inputPreview: job.data.inputPreview
      },
    });

    console.log("Stored inference log");
}, { connection })


worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});