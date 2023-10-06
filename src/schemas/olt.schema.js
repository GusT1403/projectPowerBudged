import { z } from "zod"

export const createOLTSchema = z.object({
  power: z.number({
    required_error: "OLT Power is required"
  }),
  connector: z.number({
    required_error: "Connector attenuation is required"
  }),
  coupler: z.number({
    required_error: "Coupler attenuation is required"
  }),
  fusion: z.number({
    required_error: "Fiber optic fusion attenuation is required"
  }),
  maxDistance: z.number({
    required_error: "Fiber optic fusion attenuation is required"
  }),
  powerOut: z.number({
    required_error: "Power out is required"
  }),
  date: z.string().datetime().optional(),
})