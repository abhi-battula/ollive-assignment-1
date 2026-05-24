import { inferenceQueue } from "../queue/inference-queue";
import type { InferenceLog } from "../types/inference-types";


export async function ingestInferenceLog( log: InferenceLog ) {
    
  await inferenceQueue.add( "inference-log", log );
}