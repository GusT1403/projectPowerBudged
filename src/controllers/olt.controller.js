import Olt from "../models/olt.model.js";

export const getOlts = async (req, res) => {
  try {
    const olts = await Olt.find({
      user: req.user.id
    }).populate('user')
    res.json(olts)
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}
export const createOlt = async (req, res) => {
  try {
    const { power, connector, coupler, fusion, maxDistance, powerOut, date } = req.body
    const newOlt = new Olt({
      power,
      connector,
      coupler,
      fusion,
      maxDistance,
      powerOut,
      date,
      user: req.user.id,
    })
    const savedOlt = await newOlt.save()
    res.json(savedOlt)
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' })
  }
}
export const getOlt = async (req, res) => {
  try {
    const olt = await Olt.findById(req.params.id)
    if (!olt) {
      return res.status(404).json({ message: 'Olt not found' })
    }
    res.json(olt)
  } catch (error) {
    return res.status(404).json({ message: "Olt not found" })
  }
}
export const updateOlt = async (req, res) => {
  try {
    const olt = await Olt.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!olt) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(olt)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
