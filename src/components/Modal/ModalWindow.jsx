import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import toast, { Toaster } from 'react-hot-toast';
import css from "./ModalWindow.module.css"
import { selectActiveContact, selectIsModalOpen } from "../../redux/contacts/selectors";
import { clearActiveContact, closeModal, openModal } from "../../redux/contacts/slice";
import * as Yup from "yup";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
    backgroundColor: "#1d1f20",
    },
};

Modal.setAppElement('#root');



export default function ModalWindow() {

    const numberFieldId = useId();
    const nameFieldId = useId();

    const activeContact = useSelector(selectActiveContact);
    const isModalOpen = useSelector(selectIsModalOpen);
    const dispatch = useDispatch();

    const successToast = () => toast.success('Successfully edited');
    const errorToast = () => toast.error('There has been an error, try reloading the page');


    const ValidationSchema = Yup.object().shape({
        name: Yup.string().min(2, "Too short!").max(20, "Too long!").required("Required!"),
        number: Yup.string().min(7, "Too short!").max(20, "Too long!").required("Required!"),
    });

    

    const handleSubmit = (values, actions) => {
        if (activeContact) {
            dispatch(editContact({
                id: activeContact.id,
                name: values.name,
                number: values.number,
            }))
                .unwrap()
                .then(() => {
                    successToast();
                    dispatch(clearActiveContact());
                })
                .catch(() => {
                    errorToast();
                });
            actions.resetForm();
            
        }
    };

    const handleClose = () => {
        dispatch(closeModal());
    }


    return isModalOpen && activeContact ? (
        <div>
            <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Modal"
                
      >
            <Toaster />
            <Formik
                initialValues={{
                    name: activeContact.name || "",
                    number: activeContact.number || "",
                }}
                onSubmit={handleSubmit}
                validationSchema={ValidationSchema}>
                <Form className={css.form}>
                    <div className={css.container}>
                        <label className={css.labelContainer} htmlFor={nameFieldId}>Name</label>
                        <Field className={css.input} type="text" name="name" id={nameFieldId}></Field>
                        <ErrorMessage className={caches.error} name="name" component="span" />
                    </div>
                    <div className={css.container}>
                        <label className={css.labelContainer} htmlFor={numberFieldId}>Number</label>
                        <Field className={css.input} type="number" name="number" id={numberFieldId}></Field>
                        <ErrorMessage className={caches.error} name="number" component="span" />
                    </div>

                
                    <button className={css.formBtn} type="submit">Save</button>
                    <button className={css.formBtnCancel} type="button" onClick={handleClose}>Cancel</button>
                </Form>
                </Formik>
                </Modal>
        </div>
        
    ) : null;
};