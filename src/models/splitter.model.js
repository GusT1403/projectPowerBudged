import mongoose from "mongoose"

const splitterSchema = new mongoose.Schema({
  configuration:{
    type: String,
    required: true,
  },
  out:{
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
  date:{
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

export default mongoose.model("Splitter", splitterSchema)