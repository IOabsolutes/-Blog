import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'
export const fetchGetComments = createAsyncThunk('allCommets/fetch', async () => {
    const { data } = await axios.get('/comments')
    return data
})
export const fetchPostComments = createAsyncThunk('commets/fetch', async (postId) => {
    const { data } = await axios.get(`/post/${postId}/comments`)
    return data
})
const initialState = {
    allComments: {
        items: [],
        status: 'loading'
    },
    postComments: {
        items: [],
        status: 'loading'
    }
}

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {},
    extraReducers: {
        //All Comments
        [fetchGetComments.pending]: (state) => {
            state.allComments.items = []
            state.allComments.status = 'loading'
        },
        [fetchGetComments.fulfilled]: (state, action) => {
            state.allComments.items = action.payload
            state.allComments.status = 'loaded'
        },
        [fetchGetComments.rejected]: (state) => {
            state.allComments.status = 'error'
        },
        //Post Comments
        [fetchPostComments.pending]: (state) => {
            state.postComments.items = []
            state.postComments.status = 'loading'
        },
        [fetchPostComments.fulfilled]: (state, action) => {
            state.postComments.items = action.payload
            state.postComments.status = 'loaded'
        },
        [fetchPostComments.rejected]: (state) => {
            state.postComments.status = 'error'
        },

    }
})

const commentReduser = commentSlice.reducer
export default commentReduser