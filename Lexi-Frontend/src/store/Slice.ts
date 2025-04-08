// store/Slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalDetail {
    email: string | null;
    username: string | null;
}

interface Conversation {
    id: string;
    title: string;
    // add other conversation properties as needed
}

interface AIState {
    status: boolean;
    personalDetail: PersonalDetail;
    conversations: Conversation[];
}

const initialState: AIState = {
    status: false,
    personalDetail: {
        email: null,
        username: null,
    },
    conversations: []
}

const AISlice = createSlice({
    name: "LucidFlow",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<PersonalDetail>) => {
            state.status = true;
            state.personalDetail = action.payload;
        },

        logout: (state) => {
            state.status = false;
            state.personalDetail = {
                email: null,
                username: null
            };
            state.conversations = [];
        },

        addConversation: (state, action: PayloadAction<Conversation>) => {
            if (state.status) {
                state.conversations.push(action.payload);
            }
        },

        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            if (state.status) {
                state.conversations = action.payload;
            }
        }
    }
});

export const { login, logout, addConversation, setConversations } = AISlice.actions;
export default AISlice.reducer;