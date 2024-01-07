import { Router } from "express"
import {
  addComment,
  updateComment,
  getVideoComments,
  deleteComment,
} from "../controllers/comment.controller"

const router = Router()

router.route("/:videoId").get(getVideoComments).patch(addComment)
router.route("/c/:commentId").delete(deleteComment).patch(updateComment)

export default router
