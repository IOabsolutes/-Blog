import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./slice/postSlice"
import authReducer from "./slice/authSlice"
import commentReducer from "./slice/commentSlice"
const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer,
        com: commentReducer
    }
})
export default store