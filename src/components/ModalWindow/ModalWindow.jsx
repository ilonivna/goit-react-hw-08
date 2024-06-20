import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../redux/contacts/operations.js';
import { selectEditedContact, selectIsModalOpen } from "../../redux/modal/selectors.js";
import { closeModal } from '../../redux/modal/slice.js';
import { openModal } from '../../redux/modal/slice.js';
import toast from 'react-hot-toast';
import css from "./ModalWindow.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from 'react';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function ModalWindow() {
    const modalIsOpen = useSelector(selectIsModalOpen);
  const editedContact = useSelector(selectEditedContact);
  

  const dispatch = useDispatch();
  

  const handleClose = () => dispatch(closeModal());

  const nameFieldId = useId();
    const numberFieldId = useId();
    
    const ValidationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too short!").max(50, "Too long!").required("Required!"),
        number: Yup.string().min(3, "Too short!").max(30, "Too long!").required("Required!"),
    });
    
    const handleSubmit = (values, actions) => {
      dispatch(editContact(editedContact)).unwrap().then(() => {
      toast.success('Successfully edited!');
    }).catch(() => {
      toast.error('Oops, try again..!');
    });
    dispatch(closeModal());
        actions.resetForm();
    };

  return (
    <div>
      <Modal isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Editing Contact Modal">
        <p>Please, edit the contact below</p>

        <Formik
            initialValues={{
            name: editedContact.name,
            number: editedContact.number,
            }}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            >
            <Form className={css.form}>
                <div className={css.labelContainer}>
                <label htmlFor={nameFieldId}>Name</label>
                <Field className={css.input} type="text" name="name" id={nameFieldId}></Field>
                    <ErrorMessage
                        className={css.error} name="name" component="span" />
                </div>

                <div className={css.labelContainer}>
                <label htmlFor={numberFieldId}>Number</label>
                <Field className={css.input} type="number" name="number" id={numberFieldId}></Field>
                <ErrorMessage className={css.error} name="number" component="span" />
                </div>
                
            <button className={css.formBtn} type="submit" >Save</button>
            <button onClick={handleClose}>
          Cancel
        </button>
            </Form>
        </Formik>





  
       
      </Modal>
    </div>
  )


}


