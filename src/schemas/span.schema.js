import { z } from "zod"

export const createSpanSchema = z.object({
  name: z.string({
    required_error: "name is required"
  }),
  description: z.string({
    required_error: "description is required"
  }),
  distance: z.number({
    required_error: "distance is required"
  }),
  date: z.string().datetime().optional(),
})