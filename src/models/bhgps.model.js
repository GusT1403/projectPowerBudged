import mongoose from "mongoose"

const bhgpsSchema = new mongoose.Schema({
  span: {
    type: String,
    required: true
  },
  bhtype: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  pointer: {
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

export default mongoose.model("Bhgps", bhgpsSchema)