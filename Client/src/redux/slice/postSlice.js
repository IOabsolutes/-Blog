import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
    //get data from requset
    const { data } = await axios.get('/posts')
    return data
})
export const fetchTags = createAsyncThunk('tags/fetch', async () => {
    //get data from requset
    const { data } = await axios.get('/tags')
    return data
})
export const fetchPostRemove = createAsyncThunk('PostRemove/fetch', async (id) => {
    //get data from requset
    const { data } = await axios.delete(`/posts/${id}`)
    return data
})
export const fetchPopularPosts = createAsyncThunk('popularPosts/fetch', async () => {
    const { data } = await axios.get('/posts/popular');
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        removePost: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.payload)
        }

    },
    //describe state of async action 
    extraReducers: {
        //Feching Tags
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading'
            state.posts.items = []
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'success'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error'
        },
        //Fetching tags
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {

            state.tags.items = action.payload
            state.tags.status = 'success'

        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error'
        },
        //popular posts
        [fetchPopularPosts.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'success';
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.status = 'error';
        },

    }

})
export const { removePost } = postSlice.actions
const postReducer = postSlice.reducer
export default postReducer
