import { z } from "zod"

export const createBackhaulSchema = z.object({
  attenuation: z.number({
    required_error: "Backhaul attenuation is required"
  }),
  cablesd: z.number({
    required_error: "Cable storage distance is required"
  }),
  cablesr: z.number({
    required_error: "Cable storage remaining is required"
  }),
  crossarms: z.number({
    required_error: "Crossarms quantity remaining is required"
  }),
  odistance: z.number({
    required_error: "Optical distance is required"
  }),
  distance: z.number({
    required_error: "Distance is required"
  }),
  target: z.string({
    required_error: "Node Target is required"
  }),
  source: z.string({
    required_error: "Node Source is required"
  }),
  targetHandle: z.string({
    required_error: "Node Target is required"
  }),
  sourceHandle: z.string({
    required_error: "Node Source is required"
  }),
  powerIn: z.number({
    required_error: "Power In is required"
  }),
  powerOut: z.number({
    required_error: "Power Out is required"
  }),
  date: z.string().datetime().optional(),
})