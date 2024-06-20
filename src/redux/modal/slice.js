import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isModalOpen: false,
        editedContact: null,
    },
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.editedContact = action.payload;
        },
        closeModal: state => {
            state.isModalOpen = false;
            state.editedContact = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;