import { signIn, signUp, getUser } from './AuthController.js'
import { createPost, getAllPosts, removePost, getUserPost, editPost, getLastsTags, popularPosts } from './PostCotroller.js'
import { getLastComments, createComment, getPostComments } from './CommentController.js'
export {
    signIn,
    signUp,
    getUser,
    createPost,
    getAllPosts,
    removePost,
    getUserPost,
    editPost,
    getLastsTags,
    getLastComments,
    createComment,
    getPostComments,
    popularPosts
}