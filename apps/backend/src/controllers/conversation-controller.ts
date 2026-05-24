import type { NextFunction, Request, Response } from "express";
import { createConversation, getConversationById, getConversations } from "../services/conversation-service";

export async function createConversationController(req: Request, res: Response) {
    const conversation = await createConversation()

    res.json(conversation);
}

export async function getMessageController(req: Request<{ id: string }>, res: Response,next:NextFunction) {
    const conversationId = req.params.id;

    try {
        const messages = await getConversationById(conversationId)
        res.json(messages)
    } catch (err) {
        next(err)
    }


}

export async function getConversationsController(req:Request,res:Response,next:NextFunction){
    
    const conversations = await getConversations()

    res.json(conversations)
}
