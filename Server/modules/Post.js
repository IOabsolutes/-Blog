import mongoose from "mongoose";
//create schema in mongoDB
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        views: {
            type: Number,
            default: 0
        },
        image: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);
export default Post;
