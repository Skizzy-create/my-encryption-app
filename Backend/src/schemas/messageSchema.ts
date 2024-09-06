import zod, { ZodSchema } from "zod";

/**
 * Schema for both message encrypt and decrypt request.
 */
const messageEncDecSchema: ZodSchema = zod.object({
    message: zod.string(),
    algo: zod.string(),
});

export {
    messageEncDecSchema
};