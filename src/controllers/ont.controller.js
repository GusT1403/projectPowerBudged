import Ont from "../models/ont.model.js"

export const getOnts = async (req, res) => {
  try {
    const onts = await Ont.find({
      user: req.user.id
    }).populate('user')
    res.json(onts)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createOnt = async (req, res) => {
  try {
    const { sensitivity, overload, powerIn, date, x, y } = req.body
    const newOnt = new Ont({
      sensitivity,
      overload,
      powerIn,
      x,
      y,
      date,
      user: req.user.id,
    })
    const savedOnt = await newOnt.save()
    res.json(savedOnt)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getOnt = async (req, res) => {
  try {
    const ont = await Ont.findById(req.params.id)
    if (!ont) {
      return res.status(404).json({ message: 'Ont not found' })
    }
    res.json(ont)
  } catch (error) {
    return res.status(404).json({ message: "Ont not found" })
  }
}
export const updateOnt = async (req, res) => {
  try {
    const ont = await Ont.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!ont) {
      return res.status(404).json({ message: 'Ont not found' })
    }
    res.json(ont)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteOnt = async (req, res) => {
  try {
    const ont = await Ont.findByIdAndDelete(req.params.id)
    if (!ont) {
      return res.status(404).json({ message: 'Ont not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Ont not found" })
  }
}