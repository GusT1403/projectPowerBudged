import { z } from "zod"

export const createBackhaulSchema = z.object({
  identifier: z.string({
    required_error: "Identifier is required"
  }),
  attenuation: z.number({
    required_error: "Backhaul attenuation is required"
  }),
  cablesd: z.number({
    required_error: "Cable storage distance is required"
  }),
  cablesr: z.number({
    required_error: "Cable storage remaining is required"
  }),
  odistance: z.number({
    required_error: "Optical distance is required"
  }),
  distance: z.number({
    required_error: "Distance is required"
  }),
  date: z.string().datetime().optional(),
})