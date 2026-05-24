
import type { NextFunction, Request, Response } from "express";
import { ingestInferenceLog } from "../services/ingestion-service";
import { InferencelogSchema } from "../types/inference-types";


export async function ingestLogController(req: Request,res: Response,next: NextFunction) {
    const inferenceLog = InferencelogSchema.safeParse(req.body);
    if(!inferenceLog.success){
        return res.status(400).json({"message":"invalid payload"})
    }
  await ingestInferenceLog(inferenceLog.data);

  res.json({
    success: true,
  });
}