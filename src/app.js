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

app.use("/api/v1/users", userRouter)

export default app
