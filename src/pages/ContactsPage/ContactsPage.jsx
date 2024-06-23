import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import ContactList from "../../components/ContactList/ContactList";
import ContactEditor from "../../components/ContactEditor/ContactEditor";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import Loader from "../../components/Loader/Loader";
import { selectVisibleContacts } from "../../redux/contacts/selectors";
import SearchBox from "../../components/SearchBox/SearchBox";
import ModalWindow from "../../components/Modal/ModalWindow";


export default function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const visibleContacts = useSelector(selectVisibleContacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    return (
        <div>
        <DocumentTitle>Contacts</DocumentTitle>
            
            <ContactEditor /> 
            {isLoading && <Loader />}
            {visibleContacts.length > 0 ? <p>Your personal assistant has fetched your contacts.</p> : <p>No contacts yet! Add a few..</p>}
            <SearchBox />
           
            <ContactList />
            <ModalWindow />
        </div>
    )
}