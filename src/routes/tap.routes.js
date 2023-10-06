import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getTaps, getTap, createTap, updateTap, deleteTap } from "../controllers/tap.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createTapSchema } from "../schemas/tap.schema.js"

const router = Router()

router.get('/tap', authRequired, getTaps)
router.get('/tap/:id', authRequired, getTap)
router.post('/tap', authRequired, validateSchema(createTapSchema), createTap)
router.delete('/tap/:id', authRequired, deleteTap)
router.put('/tap/:id', authRequired, updateTap)

export default router