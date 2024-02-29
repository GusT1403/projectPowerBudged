import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getTapss, getTaps, createTaps, updateTaps, deleteTaps } from "../controllers/taps.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createTapsSchema } from "../schemas/taps.schema.js"

const router = Router()

router.get('/taps', authRequired, getTapss)
router.get('/taps/:id', authRequired, getTaps)
router.post('/taps', authRequired, validateSchema(createTapsSchema), createTaps)
router.delete('/taps/:id', authRequired, deleteTaps)
router.put('/taps/:id', authRequired, updateTaps)

export default router