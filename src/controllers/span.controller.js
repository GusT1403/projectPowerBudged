import Span from "../models/span.model.js"

export const getSpans = async (req, res) => {
  try {
    const spans = await Span.find({
      bhgps: req.params.bhgps
    })
    res.json(spans)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createSpan = async (req, res) => {
  try {
    const { lat, lon, date} = req.body
    const newSpan = new Span({
      lat,
      lon,
      bhgps: req.params.bhgps,
      date,
      user: req.user.id,
    })
    const savedSpan = await newSpan.save()
    res.json(savedSpan)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getSpan = async (req, res) => {
  try {
    const span = await Span.findById(req.params.id)
    if (!span) {
      return res.status(404).json({ message: 'Span not found' })
    }
    res.json(span)
  } catch (error) {
    return res.status(404).json({ message: "Span not found" })
  }
}
export const updateSpan = async (req, res) => {
  try {
    const span = await Span.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!span) {
      return res.status(404).json({ message: 'Span not found' })
    }
    res.json(span)
  } catch (error) {

  }
}
export const deleteSpan = async (req, res) => {
  try {
    const span = await Span.findByIdAndDelete(req.params.id)
    if (!span) {
      return res.status(404).json({ message: 'Span not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Span not found" })
  }
}