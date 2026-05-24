import Express, { Router }  from "express";
import { sendMessage } from "../controllers/chat-controller";

const app = Express()
const router = Router();



router.post("/chat",sendMessage)
export default router;

