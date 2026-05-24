import { Router } from "express";
import chatRouter from "./chat-router"
import conversationRouter from "./conversation-router";
import ingestionRouter from "./ingestion-router";

export const appRouter = Router();
appRouter.use(chatRouter);
appRouter.use("/conversations",conversationRouter)
appRouter.use("/ingest",ingestionRouter)