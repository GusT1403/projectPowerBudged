import Tap from "../models/tap.model.js"

export const getTaps = async (req, res) => {
  try {
    const taps = await Tap.find({
      user: req.user.id
    }).populate('user')
    res.json(taps)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createTap = async (req, res) => {
  try {
    const { configuration, powerIn, insert, tap, insertout, tapout, x, y, date } = req.body
    const newTap = new Tap({
      configuration,
      powerIn,
      insert,
      tap,
      insertout,
      tapout,
      x,
      y,
      date,
      user: req.user.id,
    })
    const savedTap = await newTap.save()
    res.json(savedTap)
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}
export const getTap = async (req, res) => {
  try {
    const tap = await Tap.findById(req.params.id)
    if (!tap) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(tap)
  } catch (error) {
    return res.status(404).json({ message: "Layout not found" })
  }
}
export const updateTap = async (req, res) => {
  try {
    const tap = await Tap.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!tap) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(tap)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteTap = async (req, res) => {
  try {
    const tap = await Tap.findByIdAndDelete(req.params.id)
    if (!tap) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Layout not found" })
  }
}