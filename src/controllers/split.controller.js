import Split from "../models/split.model.js"

export const getSplits = async (req, res) => {
  try {
    const split = await Split.find({
      user: req.user.id
    }).populate('user')
    res.json(split)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createSplit = async (req, res) => {
  try {
    const { configuration, loss, description, date } = req.body
    const newSplit = new Split({
      configuration,
      loss,
      description,
      date,
      user: req.user.id,
    })
    const savedSplit = await newSplit.save()
    res.json(savedSplit)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getSplit = async (req, res) => {
  try {
    const split = await Split.findById(req.params.id)
    if (!splitter) {
      return res.status(404).json({ message: 'Split not found' })
    }
    res.json(split)
  } catch (error) {
    return res.status(404).json({ message: "Split not found" })
  }
}
export const updateSplit = async (req, res) => {
  try {
    const split = await Split.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!split) {
      return res.status(404).json({ message: 'Split not found' })
    }
    res.json(split)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteSplit = async (req, res) => {
  try {
    const split = await Split.findByIdAndDelete(req.params.id)
    if (!split) {
      return res.status(404).json({ message: 'Split not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Split not found" })
  }
}