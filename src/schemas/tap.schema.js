import { z } from "zod"

export const createTapSchema = z.object({
  configuration: z.string({
    required_error: "Configuration is required"
  }),
  powerIn: z.number({
    required_error: "Power In is required"
  }),
  insert: z.number({
    required_error: "Insert output attenuation is required"
  }),
  tap: z.number({
    required_error: "Tap output attenuation is required"
  }),
  insertout: z.number({
    required_error: "Insert output attenuation is required"
  }),
  tapout: z.number({
    required_error: "Tap output attenuation is required"
  }),
  x: z.number({
    required_error: "Position in x axis is required"
  }),
  y: z.number({
    required_error: "Position in y axis is required"
  }),
  date: z.string().datetime().optional(),
})