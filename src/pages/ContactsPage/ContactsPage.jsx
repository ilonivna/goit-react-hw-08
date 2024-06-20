import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import { ContactList } from "../../components/ContactList/ContactList";
// import ContactEditor from "../../components/ContactEditor/ContactEditor";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import Loader from "../../components/Loader/Loader";

export default function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    return (
        <div>
        <DocumentTitle>Contacts</DocumentTitle>
            <p>Your personal assistant has fetched your contacts.</p>
            <ContactEditor />
            {isLoading && <Loader />}
            <ContactList/>
        </div>
    )
}