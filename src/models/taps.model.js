import mongoose from "mongoose"

const tapsSchema = new mongoose.Schema({
  configuration: {
    type: String,
    required: true,
  },
  tap: {
    type: Number,
    required: true,
  },
  insert: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
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
  }
}, {
  timestamps: true
})

export default mongoose.model("Taps", tapsSchema, "taps")