import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'

export const fetchSignIn = createAsyncThunk('auth/fetch', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})
export const fetchSignUp = createAsyncThunk('auth/fetch', async (params) => {
    const { data } = await axios.post('/auth/reg', params)
    return data
})
// make req to server and our backend checks inside req param Authorization and take from there token
// to fine user in data base
export const fetchSignMe = createAsyncThunk('authMe/fetch', async () => {
    const { data } = await axios.get('/auth/user')
    return data
})

const initialState = {
    data: null,
    status: 'loading',
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.data = null
            state.status = 'loading'
            state.isAuth = false
        }
    },
    extraReducers: {
        [fetchSignIn.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchSignIn.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'success'
            state.isAuth = true
        },
        [fetchSignIn.rejected]: (state) => {
            state.status = 'error'
        },
        [fetchSignMe.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchSignMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'success'
            state.isAuth = true
        },
        [fetchSignMe.rejected]: (state) => {
            state.status = 'error'
        },
        [fetchSignUp.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchSignUp.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'success'
            state.isAuth = true
        },
        [fetchSignUp.rejected]: (state) => {
            state.status = 'error'
        },
    }
})

export const { logOut } = authSlice.actions;
const authReducer = authSlice.reducer
export default authReducer