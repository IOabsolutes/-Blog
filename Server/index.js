import express from "express";
import mongoDB from "mongoose";
import multer from "multer";
import cors from 'cors'
import { registerValidation, postCreateValidation, loginValidation, commentCreateValidation } from "./validation/validations.js";
import {
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
    getPostComments,
    createComment,
    popularPosts
} from './Controllers/index.js'
import corsOptions from "./Config/corsOtptions.js";
import { checkAuth, validationErrors } from "./util/index.js";
const url =
    "mongodb+srv://jabsoluty:wwrA5uCUledUGup0@cluster0.ic7if8g.mongodb.net/?retryWrites=true&w=majority";
mongoDB
    .connect(url)
    .then(() => console.log("data base has connected"))
    .catch((error) => console.log("something went wrong", error));

const PORT = "4420";
//all logic store in app
const app = express();

const storage = multer.diskStorage({
    //return destination of file
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    //give the file name
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })
app.use(express.json());  //this allow to use json mean parsing in Express app(reading)
app.use(cors(corsOptions)); //setting up CORS options also use CORS
//if /uploads gets any request it`s will check floder uploads
app.use('/uploads', express.static('uploads'))

// upload.single('image') we`re waiting for image file
app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    //return destanation of file to user
    res.json({ url: `/uploads/${req.file.originalname}` })
})

// login path
app.post('/auth/login', loginValidation, validationErrors, signIn)
// registration path
app.post('/auth/reg', registerValidation, validationErrors, signUp);
// get user path
app.get('/auth/user', checkAuth, getUser)

app.get('/tags', getLastsTags)
app.get('/posts/tags', getLastsTags)
//post CRUD realization
app.post('/posts', checkAuth, postCreateValidation, validationErrors, createPost)// the fuctions will execute one by one first comes checkAuth second postCreateValidation etc.
app.get('/posts', getAllPosts)
app.get('/posts/popular', popularPosts)
app.get('/posts/:id', getUserPost)
app.patch('/posts/:id', checkAuth, postCreateValidation, editPost)
app.delete('/posts/:id', checkAuth, removePost)

//comment login add, get, getByPostId
app.get('/comments', getLastComments)
app.post('/comments', checkAuth, commentCreateValidation, createComment)
app.get('/post/:id/comments', getPostComments)


//listen port 
app.listen(PORT, (error) => {
    if (error) {
        return error;
    }
    console.log('server working')
});
