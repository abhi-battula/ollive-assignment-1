import { Router } from "express";
import { createConversationController, getConversationsController, getMessageController } from "../controllers/conversation-controller";
import { getConversations } from "../services/conversation-service";

const router = Router()

//create new conversation
router.post("/",createConversationController);

//get particular conversation based on id
router.get("/:id/messages",getMessageController)

// get all the conversations list ids and titles
router.get("",getConversationsController)

export default router;