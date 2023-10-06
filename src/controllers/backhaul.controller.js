import Backhaul from "../models/backhaul.model.js"

export const getBackhauls = async (req, res) => {
  try {
    const backhauls = await Backhaul.find({
      user: req.user.id
    }).populate('user')
    res.json(backhauls)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createBackhaul = async (req, res) => {
  try {
    const { identifier, attenuation, cablesd, cablesr, odistance, distance, date } = req.body
    const newBackhaul = new Backhaul({
      identifier,
      attenuation,
      cablesd,
      cablesr,
      odistance,
      distance,
      date,
      user: req.user.id,
    })
    const savedBackhaul = await newBackhaul.save()
    res.json(savedBackhaul)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getBackhaul = async (req, res) => {
  try {
    const backhaul = await Backhaul.findById(req.params.id)
    if (!backhaul) {
      return res.status(404).json({ message: 'Backhaul not found' })
    }
    res.json(backhaul)
  } catch (error) {
    return res.status(404).json({ message: "Backhaul not found" })
  }
}
export const updateBackhaul = async (req, res) => {
  try {
    const backhaul = await Backhaul.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!backhaul) {
      return res.status(404).json({ message: 'Backhaul not found' })
    }
    res.json(backhaul)
  } catch (error) {

  }
}
export const deleteBackhaul = async (req, res) => {
  try {
    const backhaul = await Backhaul.findByIdAndDelete(req.params.id)
    if (!backhaul) {
      return res.status(404).json({ message: 'Backhaul not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Backhaul not found" })
  }
}