import mongoose from "mongoose"

const oltSchema = new mongoose.Schema({
  power: {
    type: Number,
    required: true,
  },
  connector: {
    type: Number,
    required: true,
  },
  coupler: {
    type: Number,
    required: true,
  },
  fusion: {
    type: Number,
    required: true,
  },
  maxDistance: {
    type: Number,
    required: true,
  },
  powerOut: {
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

export default mongoose.model("Olt", oltSchema)