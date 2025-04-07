import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    personalDetail: {
        email: null,
        username: null,
    }
}


const AISlice = createSlice({
    name: "LucidFlow",
    initialState,
    reducers: {
        login:  (state, action) => {
            state.status = true
            state.personalDetail = action.payload
        },

        logout: (state, action) => {
            state.status = false
            state.personalDetail = {
                email: null,
                username: null
            }
        }
    }
})

export const { login, logout } = AISlice.actions

export default AISlice.reducer