import { z } from "zod"

export const createSpanSchema = z.object({
  lat: z.number({
    required_error: "latitude is required"
  }),
  lon: z.number({
    required_error: "longitude is required"
  }),
  bhgps: z.string({
    required_error: "Backhaul id is required"
  }),
  date: z.string().datetime().optional(),
})