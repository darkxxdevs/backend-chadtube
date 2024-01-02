import { Schema, model } from "mongoose"

const CommentSchema = new Schema(
  {
    content: {
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export const Comment = model("Comments", CommentSchema)
