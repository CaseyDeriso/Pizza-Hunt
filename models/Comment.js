const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const replySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment_id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      trim: true,
      minLength: 2,
      unique: true,
      required: true,
      type: String,
    },
    writtenBy: {
      minLength: 2,
      required: true,
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      minLength: 2,
      required: true,
      type: String,
    },
    commentBody: {
      trim: true,
      minLength: 2,
      unique: true,
      required: true,
      type: String,
    },
    replies: [replySchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

CommentSchema.virtual("ReplyCount").get(function () {
  return this.replies.length;
})

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
