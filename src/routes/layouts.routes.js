import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getLayouts, getLayout, createLayout, updateLayout, deleteLayout } from "../controllers/layouts.controller.js";
import { validateSchema } from "../middlewares/validateData.js"
import { createLayoutSchema } from "../schemas/layout.schema.js"
const router = Router()

router.get('/layouts', authRequired, getLayouts)
router.get('/layouts/:id', authRequired, getLayout)
router.post('/layouts', authRequired, validateSchema(createLayoutSchema), createLayout)
router.delete('/layouts/:id', authRequired, deleteLayout)
router.put('/layouts/:id', authRequired, updateLayout)

export default router