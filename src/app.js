import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// <-- middlewares -->

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(
  express.json({
    limit: "60kb",
  })
)

app.use(
  express.urlencoded({
    extended: true,
    limit: "60kb",
  })
)

app.use(express.static("public"))
app.use(cookieParser())

// route imports
import userRouter from "./routes/users.routes.js"
import commentRouter from "./routes/comments.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/dashboars/", dashboardRouter)

export default app
