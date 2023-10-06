import { z } from "zod"

export const createTapSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  insert: z.number({
    required_error: "Insert output attenuation is required"
  }),
  tap: z.number({
    required_error: "Tap output attenuation is required"
  }),
  date: z.string().datetime().optional(),
})