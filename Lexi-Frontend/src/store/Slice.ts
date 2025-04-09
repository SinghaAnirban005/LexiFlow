import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalDetail {
    email: string | null;
    username: string | null;
}

interface Conversation {
    id: string;
    title: string;
}

interface Prompt {
    id: string;
    prompt_title: string;
    created_at: string;
    responses: {
      id: string;
      response: string;
      created_at: string;
    }[];
}

// interface Prompts {
//     id: string,
//     prompt_title: string,
//     response: string
//     convoId: string
// }

interface AIState {
    status: boolean;
    personalDetail: PersonalDetail;
    conversations: Conversation[];
    userPrompts: Prompt[]
}

const initialState: AIState = {
    status: false,
    personalDetail: {
        email: null,
        username: null,
    },
    conversations: [],
    userPrompts: []
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
            state.userPrompts = []
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
        },

        setUserPrompts: (state, action: PayloadAction<Prompt[]>) => {
            if (state.status) {
                state.userPrompts = action.payload;
                console.log(state.userPrompts)
            }
        },

        addUserPromptWithResponse: (state, action: PayloadAction<Prompt>) => {
            if (state.status) {
              const existingIndex = state.userPrompts.findIndex(
                p => p.id === action.payload.id
              );
              
              if (existingIndex >= 0) {
                state.userPrompts[existingIndex] = action.payload;
              } else {
                state.userPrompts.push(action.payload);
              }
            }

            console.log(state.userPrompts)
        },

        clearPrompts: (state) => {
            if (state.status) {
              state.userPrompts = [];
            }
        },
    }
});

export const { login, logout, addConversation, setConversations, setUserPrompts, addUserPromptWithResponse, clearPrompts } = AISlice.actions;
export default AISlice.reducer;