import { Router } from "express";
import { ingestLogController } from "../controllers/ingestion-controller";

const router = Router();

router.post("/",ingestLogController)

export default router