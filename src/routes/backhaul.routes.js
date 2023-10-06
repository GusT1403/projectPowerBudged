import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getBackhauls, getBackhaul,createBackhaul, updateBackhaul, deleteBackhaul } from "../controllers/backhaul.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createBackhaulSchema } from "../schemas/backhaul.schema.js"
const router = Router()

router.get('/backhaul', authRequired, getBackhauls)
router.get('/backhaul/:id', authRequired, getBackhaul)
router.post('/backhaul', authRequired, validateSchema(createBackhaulSchema), createBackhaul)
router.delete('/backhaul/:id', authRequired, deleteBackhaul)
router.put('/backhaul/:id', authRequired, updateBackhaul)

export default router