import { z } from "zod"

export const createTapsSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  tap: z.number({
    required_error: "Power In is required"
  }),
  insert: z.number({
    required_error: "Insert output attenuation is required"
  }),
  description: z.string({
    required_error: "Description is required"
  }),
  date: z.string().datetime().optional(),
})