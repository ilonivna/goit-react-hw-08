import Contact from "../Contact/Contact";
import css from './ContactList.module.css';
import { useSelector } from "react-redux";

import { selectVisibleContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
    const visibleContacts = useSelector(selectVisibleContacts);

    return (
        <ul className={css.list}>
            {visibleContacts.map((contact) => (
                <li key={contact.id}>
                    <Contact id={contact.id} name={contact.name} number={contact.number} />
                </li>
            ))}
        </ul>
    )
}