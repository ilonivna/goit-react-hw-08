import css from "./Contact.module.css"
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import { openModal } from "../../redux/modal/slice.js";



export default function Contact({  name, id, number }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteContact(id));
    }

    const handleEdit = () => {
        dispatch(openModal(id));
    }
    return (
        <div className={css.contact}>
            <div>
            <p><IoPerson />{name}</p>
            <p><MdLocalPhone />
                    {number}</p></div>
            <div className={css.btnContainer}>
            <button className={css.btn} onClick={handleDelete}>Delete</button>
            <button className={css.btnEdit} onClick={handleEdit}>Edit</button></div>
        </div>
    )
}