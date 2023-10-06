import { z } from "zod"

export const createOntSchema = z.object({
  sensitivity: z.number({
    required_error: "Sensitivity is required"
  }),
  overload: z.number({
    required_error: "Overload is required"
  }),
  date: z.string().datetime().optional(),
})