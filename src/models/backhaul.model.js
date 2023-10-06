import mongoose from "mongoose"

const backhaulSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true
  },
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
  odistance: {
    type: Number,
    required: true
  },
  distance: {
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