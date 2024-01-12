import mongoose from "mongoose"

const tapSchema = new mongoose.Schema({
  configuration: {
    type: String,
    required: true,
  },
  insert: {
    type: Number,
    required: true,
  },
  tap: {
    type: Number,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
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

export default mongoose.model("Tap", tapSchema)