import { z } from "zod"

export const createSplitterSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  out: z.number({
    required_error: "Output attenuation is required"
  }),
  x: z.number({
    required_error: "Position in x axis is required"
  }),
  y: z.number({
    required_error: "Position in y axis is required"
  }),
  date: z.string().datetime().optional(),
})