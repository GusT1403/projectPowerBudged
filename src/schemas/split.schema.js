import { z } from "zod"

export const createSplitSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  loss: z.number({
    required_error: "Insert loss is required"
  }),
  description: z.string({
    required_error: "Description is required"
  }),
  date: z.string().datetime().optional(),
})