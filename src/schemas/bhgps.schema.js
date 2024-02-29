import { z } from "zod"

export const createBhgpsSchema = z.object({
  span: z.string({
    required_error: "Identifier is required"
  }),
  bhtype: z.string({
    required_error: "Backhaul GPS type is required"
  }),
  lat: z.number({
    required_error: "Latitude is required"
  }),
  lon: z.number({
    required_error: "Longitude is required"
  }),
  pointer: z.number({
    required_error: "Coordinate pointer is required"
  }),
  date: z.string().datetime().optional(),
})