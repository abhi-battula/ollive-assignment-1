import { prisma } from "../../db";

export async function createConversation() {
  const conversation = await prisma.conversation.create({
    data: {}
  })

  if (!conversation) {
    throw new Error("Conversation not found")
  }

  return conversation;
}

export async function getConversationById(conversationId: string) {


  const messages = await prisma.message.findMany({
    where: {
      conversationId
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return messages;
}

export async function getConversations(){
 const res = await prisma.conversation.findMany({
    
  })

  return res;
  
}