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
import likeRouter from "./routes/like.routes.js"
import subcriptionRouter from "./routes/subscriptions.routes.js"
import healthCheckRouter from "./routes/healthcheck.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import videoRouter from "./routes/video.routes.js"
import tweetRouter from "./routes/tweet.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/subscriptions", subcriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/tweet", tweetRouter)

export default app
