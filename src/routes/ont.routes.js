import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getOnts, getOnt, createOnt, updateOnt, deleteOnt } from "../controllers/ont.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createOntSchema } from "../schemas/ont.schema.js"
const router = Router()

router.get('/ont', authRequired, getOnts)
router.get('/ont/:id', authRequired, getOnt)
router.post('/ont', authRequired, validateSchema(createOntSchema), createOnt)
router.delete('/ont/:id', authRequired, deleteOnt)
router.put('/ont/:id', authRequired, updateOnt)

export default router