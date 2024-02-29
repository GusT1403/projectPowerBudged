import Splitter from "../models/splitter.model.js"

export const getSplitters = async (req, res) => {
  try {
    const splitter = await Splitter.find({
      user: req.user.id
    }).populate('user')
    res.json(splitter)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createSplitter = async (req, res) => {
  try {
    const { configuration, powerIn, out, loss, x, y, date } = req.body
    const newSplitter = new Splitter({
      configuration,
      powerIn,
      out,
      loss,
      x,
      y,
      date,
      user: req.user.id,
    })
    const savedSplitter = await newSplitter.save()
    res.json(savedSplitter)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getSplitter = async (req, res) => {
  try {
    const splitter = await Splitter.findById(req.params.id)
    if (!splitter) {
      return res.status(404).json({ message: 'Splitter not found' })
    }
    res.json(splitter)
  } catch (error) {
    return res.status(404).json({ message: "Splitter not found" })
  }
}
export const updateSplitter = async (req, res) => {
  try {
    const splitter = await Splitter.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!splitter) {
      return res.status(404).json({ message: 'Splitter not found' })
    }
    res.json(splitter)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteSplitter = async (req, res) => {
  try {
    const splitter = await Splitter.findByIdAndDelete(req.params.id)
    if (!splitter) {
      return res.status(404).json({ message: 'Splitter not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Splitter not found" })
  }
}