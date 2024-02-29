import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getSplits, getSplit, createSplit, updateSplit, deleteSplit } from "../controllers/split.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createSplitSchema } from "../schemas/split.schema.js"
const router = Router()

router.get('/split', authRequired, getSplits)
router.get('/split/:id', authRequired, getSplit)
router.post('/split', authRequired, validateSchema(createSplitSchema), createSplit)
router.delete('/split/:id', authRequired, deleteSplit)
router.put('/split/:id', authRequired, updateSplit)

export default router