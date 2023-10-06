import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getSplitters, getSplitter, createSplitter, updateSplitter, deleteSplitter } from "../controllers/splitter.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createSplitterSchema } from "../schemas/splitter.schema.js"
const router = Router()

router.get('/splitter', authRequired, getSplitters)
router.get('/splitter/:id', authRequired, getSplitter)
router.post('/splitter', authRequired, validateSchema(createSplitterSchema), createSplitter)
router.delete('/splitter/:id', authRequired, deleteSplitter)
router.put('/splitter/:id', authRequired, updateSplitter)

export default router