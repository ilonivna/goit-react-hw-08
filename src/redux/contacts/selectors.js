import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/selectors";




export const selectContacts = (state) => state.contacts.items;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => {
    state.contacts.error;
}

export const selectVisibleContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, contactsFilter) => {
        return contacts.filter(contact => contact.name.toLowerCase().includes(contactsFilter.toLowerCase()));
    }
);
