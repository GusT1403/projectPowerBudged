import mongoose from "mongoose"

const bhgpsSchema = new mongoose.Schema({
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
  olat: {
    type: Date,
    default: Date.now,
  },
  olon: {
    type: Date,
    default: Date.now,
  },
  elat: {
    type: Date,
    default: Date.now,
  },
  elon: {
    type: Date,
    default: Date.now,
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

export default mongoose.model("Bhgps", bhgpsSchema)