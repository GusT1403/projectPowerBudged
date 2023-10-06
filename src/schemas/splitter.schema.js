import { z } from "zod"

export const createSplitterSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  out: z.number({
    required_error: "Output attenuation is required"
  }),
  date: z.string().datetime().optional(),
})