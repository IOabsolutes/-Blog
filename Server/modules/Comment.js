import mongoose from "mongoose";
const CommentShema = new mongoose.Schema(
    {
        massege: {
            type: String,
            require: true,
        },
        postId: {
            type: String,
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
    },
    { timestamps: true }
)

const Comment = mongoose.model('Comment', CommentShema)
export default Comment