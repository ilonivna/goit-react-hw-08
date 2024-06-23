import css from "./Contact.module.css"
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import { setActiveContact, clearActiveContact } from "../../redux/contacts/slice.js";
import { selectIsModalOpen } from "../../redux/contacts/selectors.js";




export default function Contact({  name, id, number }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteContact(id));
    }

    const isModalOpen = useSelector(selectIsModalOpen);

    const handleEdit = () => {
        if (!isModalOpen) {
            dispatch(setActiveContact({ name, number, id }));
        } else {
            clearActiveContact();
        }
    };
    

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