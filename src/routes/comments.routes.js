import { Router } from "express"
import {
  addComment,
  updateComment,
  getVideoComments,
  deleteComment,
} from "../controllers/comment.controller.js"

const router = Router()

router.route("/:videoId").get(getVideoComments).post(addComment)
router.route("/c/:commentId").delete(deleteComment).patch(updateComment)

export default router
