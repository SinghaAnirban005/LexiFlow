import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    personalDetail: {
        email: null,
        username: null,
    },
    conversations: [] as any
}


const AISlice = createSlice({
    name: "LucidFlow",
    initialState,
    reducers: {
        login:  (state, action) => {
            state.status = true
            state.personalDetail = action.payload
        },

        logout: (state) => {
            state.status = false
            state.personalDetail = {
                email: null,
                username: null
            }
        },

        addConversation: (state, action) => {
            if(state.status) {
                state.conversations = [...state.conversations, action.payload]
            }
        }
    }
})

export const { login, logout, addConversation } = AISlice.actions

export default AISlice.reducer