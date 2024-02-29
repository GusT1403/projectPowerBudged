import Taps from "../models/taps.model.js"

export const getTapss = async (req, res) => {
  try {
    const tapss = await Taps.find({
      user: req.user.id
    }).populate('user')
    res.json(tapss)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createTaps = async (req, res) => {
  try {
    const { configuration, insert, tap, description, date } = req.body
    const newTaps = new Taps({
      configuration,
      insert,
      tap,
      description,
      date,
      user: req.user.id,
    })
    const savedTaps = await newTaps.save()
    res.json(savedTaps)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getTaps = async (req, res) => {
  try {
    const taps = await Taps.findById(req.params.id)
    if (!taps) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(taps)
  } catch (error) {
    return res.status(404).json({ message: "Layout not found" })
  }
}
export const updateTaps = async (req, res) => {
  try {
    const taps = await Taps.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!taps) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(taps)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteTaps = async (req, res) => {
  try {
    const taps = await Taps.findByIdAndDelete(req.params.id)
    if (!taps) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Layout not found" })
  }
}