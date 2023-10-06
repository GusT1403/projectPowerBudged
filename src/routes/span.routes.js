import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getSpans,getSpan,createSpan,updateSpan,deleteSpan } from "..controllers/span.controller.js"
import { validateSchema } from "../middlewares/validateData.js"
import { createSpanSchema } from "../schemas/span.schema.js"
const router = Router()

router.get('/span/:bhgps', authRequired, getSpans)
router.get('/span/:id', authRequired, getSpan)
router.post('/span/:bhgps', authRequired, authRequired, validateSchema(createSpanSchema), createSpan)
router.delete('/span/:id', authRequired, deleteSpan)
router.put('/span:id', authRequired, updateSpan)

export default router