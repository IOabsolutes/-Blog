import Post from "../modules/Post.js";

export async function getLastsTags(req, res) {
    try {
        // get 5 posts
        const post = await Post.find().limit(5).exec();
        // pulling out tags from post object turn multidimensional array into a one-dimensional array and reutrn 5 first elements
        const tags = post.map((item) => item.tags).flat().slice(0, 5)
        res.json(tags)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "failure to get tags" })
    }
}
export async function createPost(req, res) {
    try {
        //create new collection is mongoDB
        const PostShema = new Post({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(' '),
            image: req.body.image,
            user: req.userId
        })
        //save this
        const createPost = await PostShema.save();
        res.json(createPost)
    } catch (err) {
        return res.status(500).json({ message: "failed to create a post" })
    }
}
export async function removePost(req, res) {
    try {
        const postId = req.params.id
        //first searching the id which want delete
        //second is callback that return massage  
        const remove = await Post.findByIdAndDelete({
            _id: postId
        })
        if (!remove) {
            return res.status(400).json({ message: "post no longer exist" })
        }
        res.json({ message: "post was sucsseful remove!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "post is undefind" })
    }
}
export async function editPost(req, res) {
    try {
        const postId = req.params.id
        await Post.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(' '),
            image: req.body.image,
            user: req.userId
        })

        res.json({ message: "post had been edited!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "failure to edit the post" })
    }

}
export async function getUserPost(req, res) {
    try {
        // get the dynamic parameter from path part
        const postId = req.params.id
        //first query is search element by id
        //second is method what was use to update on of parameter
        //thrid is specifies that the updated document should be returned
        //exec return promise resolves the result of the query
        const userPost = await
            Post.findOneAndUpdate({
                _id: postId,
            }, {
                $inc: { views: 1 },
            }, {
                returnDocument: "after",
            }).populate('user').exec() // also added populate('user') for inherit an object user 
        // it`s allow get object of user instead just _id of user 

        if (!userPost) {
            return res.status(401).json({ message: "post does`t exist" })
        }
        res.json(userPost)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "failure to get post" })
    }
}
export async function getAllPosts(req, res) {
    try {
        // find in DB all posts and we replace populate in the case user
        const getAllPosts = await Post.find().populate("user").exec();
        res.json(getAllPosts)
    } catch (err) {
        return res.status(500).json({ message: "failure to get posts" })
    }
}

export async function popularPosts(req, res) {
    try {
        const getPopularPosts = await Post.find().sort('-views').populate("user").exec()
        res.json(getPopularPosts)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "failure to get posts" })
    }

}