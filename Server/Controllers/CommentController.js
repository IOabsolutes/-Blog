import Comment from '../modules/Comment.js';

export async function getLastComments(req, res) {
    try {
        const getLastComments = await Comment
            .find()
            .limit(8)
            .sort('-createAt')
            .populate('user')
            .exec()
        res.json(getLastComments)
    } catch (error) {
        return res.status(500).json({ message: "failure to get comments" })
    }
}

export async function createComment(req, res) {
    try {
        const CommentShema = new Comment({
            massege: req.body.massege,
            postId: req.body.postId,
            user: req.userId
        })
        const commentCreate = await CommentShema.save()
        res.json(commentCreate)
    } catch (err) {
        return res.status(500).json({ message: "failed to post comment" })
    }
}

export async function getPostComments(req, res) {
    try {
        const params = req.params.id
        const getComments = await Comment.find({ postId: params }).populate('user').exec()
        res.json(getComments)
    } catch (error) {
        return res.status(500).json({ message: "failure to get comments" })
    }
}
