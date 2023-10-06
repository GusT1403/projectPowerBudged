import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import oltRoutes from "./routes/olt.routes.js"
import tapRoutes from "./routes/tap.routes.js"
import splitterRoutes from "./routes/splitter.routes.js"
import ontRoutes from "./routes/ont.routes.js"
import backhaulRoutes from "./routes/backhaul.routes.js"
import bhgpsRoutes from "./routes/bhgps.routes.js"
import spanRoutes from "./routes/span.routes.js"

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes)
app.use("/api", oltRoutes)
app.use("/api", tapRoutes)
app.use("/api", splitterRoutes)
app.use("/api", ontRoutes)
app.use("/api", backhaulRoutes)
app.use("/api", bhgpsRoutes)
app.use("/api", spanRoutes)

export default app