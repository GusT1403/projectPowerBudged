import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getOlt, createOlt, updateOlt, getOlts } from "../controllers/olt.controller.js";
import { validateSchema } from "../middlewares/validateData.js"
import { createOLTSchema } from "../schemas/olt.schema.js";
const router = Router()

router.get('/olt', authRequired, getOlts)
router.get('/olt/:id', authRequired, getOlt)
router.post('/olt', authRequired, validateSchema(createOLTSchema), createOlt)
router.put('/olt/:id', authRequired, updateOlt)

export default router