import { z } from "zod"

export const createOntSchema = z.object({
  sensitivity: z.number({
    required_error: "Sensitivity is required"
  }),
  overload: z.number({
    required_error: "Overload is required"
  }),
  powerIn: z.number({
    required_error: "Input power is required"
  }),
  x: z.number({
    required_error: "Position in x axis is required"
  }),
  y: z.number({
    required_error: "Position in y axis is required"
  }),
  date: z.string().datetime().optional(),
})