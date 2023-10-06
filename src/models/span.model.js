import mongoose from "mongoose"

const spanSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  bhgps: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bhgps',
    required: true,
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

export default mongoose.model("Span", spanSchema)