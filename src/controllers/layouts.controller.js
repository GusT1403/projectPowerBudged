import Layout from "../models/layout.model.js"

export const getLayouts = async (req, res) => {
  try {
    const layouts = await Layout.find({
      user: req.user.id
    }).populate('user')
    res.json(layouts)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const createLayout = async (req, res) => {
  try {
    const { title, description, date } = req.body
    const newLayout = new Layout({
      title,
      description,
      date,
      user: req.user.id,
    })
    const savedLayout = await newLayout.save()
    res.json(savedLayout)
  } catch (error) {
    return res.status(500).json({ message: 'something wewent wrong' })
  }
}
export const getLayout = async (req, res) => {
  try {
    const layout = await Layout.findById(req.params.id)
    if (!layout) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(layout)
  } catch (error) {
    return res.status(404).json({ message: "Layout not found" })
  }
}
export const updateLayout = async (req, res) => {
  try {
    const layout = await Layout.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!layout) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.json(layout)
  } catch (error) {

  }
}
export const deleteLayout = async (req, res) => {
  try {
    const layout = await Layout.findByIdAndDelete(req.params.id)
    if (!layout) {
      return res.status(404).json({ message: 'Layout not found' })
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: "Layout not found" })
  }
}