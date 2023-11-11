import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.Model("Video", videoSchema)
