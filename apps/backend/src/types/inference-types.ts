import z from "zod";

export const InferencelogSchema = z.object({
    provider: z.string(),
    model: z.string(),
    latencyMs: z.number(),
    status: z.enum(["success","error"]),
    errorMessage: z.string().optional(),
    conversationId: z.string(),
    createdAt: z.coerce.date(),
    inputPreview: z.string()
})

export type InferenceLog = z.infer<typeof InferencelogSchema>
export type InferenceLogInput = z.input<typeof InferencelogSchema>;