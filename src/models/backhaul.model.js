import mongoose from "mongoose"

const backhaulSchema = new mongoose.Schema({
  attenuation: {
    type: Number,
    required: true
  },
  cablesd: {
    type: Number,
    required: true
  },
  cablesr: {
    type: Number,
    required: true
  },
  crossarms: {
    type: Number,
    required: true
  },
  odistance: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  targetHandle: {
    type: String,
    required: true
  },
  sourceHandle: {
    type: String,
    required: true
  },
  powerIn: {
    type: Number,
    required: true
  },
  powerOut: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

export default mongoose.model("Backhaul", backhaulSchema)