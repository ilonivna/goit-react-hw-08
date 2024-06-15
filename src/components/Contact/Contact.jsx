import css from "./Contact.module.css"
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";



export default function Contact({ id, name, number }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteContact(id));
    }

    return (
        <div className={css.contact}>
            <div>
            <p><IoPerson />{name}</p>
            <p><MdLocalPhone />
{number}</p></div>
            <button className={css.btn} onClick={handleDelete}>Delete</button>
        </div>
    )
}