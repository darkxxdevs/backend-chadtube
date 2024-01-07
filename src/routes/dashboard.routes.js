import { Router } from "express"
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controller"
const router = Router()

router.route("/stats").get(getChannelStats)
router.route("/videos").get(getChannelVideos)

export default router
