import Bhgps from "../models/bhgps.model.js"

export const getBhgpss = async (req, res) => {
  try {
    const bhgps = await Bhgps.find({
      user: req.user.id
    }).populate('user')
    res.json(bhgps)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createBhgps = async (req, res) => {
  try {
    const { identifier, attenuation, cablesd, cablesr, odistance, distance, olat, olon, elat, elon, date } = req.body
    const newBhgps = new Bhgps({
      identifier,
      attenuation,
      cablesd,
      cablesr,
      odistance,
      distance,
      olat,
      olon,
      elat,
      elon,
      date,
      user: req.user.id,
    })
    const savedBhgps = await newBhgps.save()
    res.json(savedBhgps)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getBhgps = async (req, res) => {
  try {
    const bhgps = await Bhgps.findById(req.params.id)
    if (!bhgps) {
      return res.status(404).json({ message: 'Backhaul not found' })
    }
    res.json(bhgps)
  } catch (error) {
    return res.status(404).json({ message: "Backhaul not found" })
  }
}
export const updateBhgps = async (req, res) => {
  try {
    const bhgps = await Bhgps.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!bhgps) {
      return res.status(404).json({ message: 'Backhaul not found' })
    }
    res.json(bhgps)
  } catch (error) {

  }
}
export const deleteBhgps = async (req, res) => {
  try {
    const bhgps = await Bhgps.findByIdAndDelete(req.params.id)
    if (!bhgps) {
      return res.status(404).json({ message: 'Backhaul not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Backhaul not found" })
  }
}