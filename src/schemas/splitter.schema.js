import { z } from "zod"

export const createSplitterSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  powerIn: z.number({
    required_error: "Power In is required"
  }),
  out: z.number({
    required_error: "Output attenuation is required"
  }),
  loss: z.number({
    required_error: "Power loss is required"
  }),
  x: z.number({
    required_error: "Position in x axis is required"
  }),
  y: z.number({
    required_error: "Position in y axis is required"
  }),
  date: z.string().datetime().optional(),
})