import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, editContact } from "./operations";
import { logout } from "../auth/operations.js"

const handlePending = state => {
    state.loading = true;
    state.error = false;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};


const slice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        loading: false,
        isModalOpen: false,
        activeContact: null,
        error: false,
    },
    reducers: {
        openModal(state) {
            state.isModalOpen = true;
        },
        closeModal(state) {
            state.isModalOpen = false;
        },
        setActiveContact(state, action) {
            state.activeContact = action.payload;
            state.isModalOpen = true;
        },
        clearActiveContact(state) {
            state.activeContact = null;
            state.isModalOpen = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            }).addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload.id);
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(editContact.rejected, handleRejected)
            .addCase(editContact.pending, handlePending)
            .addCase(editContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex((contact) => contact.id === action.payload.id);
                state.items[index] = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.items = [];
                state.error = null;
                state.loading = false;
        })
        }
    }
);

export const contactsReducer = slice.reducer;
export const { setActiveContact, clearActiveContact, openModal, closeModal } = slice.actions;