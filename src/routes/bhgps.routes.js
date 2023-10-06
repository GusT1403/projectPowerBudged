import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getBhgpss, getBhgps, createBhgps, updateBhgps, deleteBhgps } from "../controllers/bhgps.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createBhgpsSchema } from "../schemas/bhgps.schema.js"
const router = Router()

router.get('/bhgps', authRequired, getBhgpss)
router.get('/bhgps/:id', authRequired, getBhgps)
router.post('/bhgps', authRequired, validateSchema(createBhgpsSchema), createBhgps)
router.delete('/bhgps/:id', authRequired, deleteBhgps)
router.put('/bhgps/:id', authRequired, updateBhgps)

export default router