import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { useId } from "react";
import css from "./ContactEditor.module.css";



export default function ContactEditor() {
    const dispatch = useDispatch();

    const numberFieldId = useId();
    const nameFieldId = useId();

    const successToast = () => toast.success('Contact successfully added!');
    const errorToast = () => toast.error('Could not add, try reloading the page');

    const ValidationSchema = Yup.object().shape({
        name: Yup.string().min(2, "Too short!").max(20, "Too long!").required("Required!"),
        number: Yup.number().required("Required!"),
    });


    const handleSubmit = (values, actions) => {
        
        dispatch(addContact(values)).unwrap()
            .then(() => { successToast() })
            .catch(() => { errorToast() });

        actions.resetForm();
    
    }



    return (
        <div>
            <Toaster />
            <Formik 
                initialValues={{
                    name: "",
                    number: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={ValidationSchema}>
                <Form className={css.form}>
                    <div className={css.container}>
                        <label className={css.labelContainer} htmlFor={nameFieldId}>Name</label>
                        <Field className={css.input} type="text" name="name" id={nameFieldId}></Field>
                        <ErrorMessage className={caches.error} name="name" component="span"/>
                    </div>
                    <div className={css.container}>
                        <label className={css.labelContainer} htmlFor={numberFieldId}>Phone number</label>
                        <Field className={css.input} type="number" name="number" id={numberFieldId}></Field>
                        <ErrorMessage className={caches.error} name="number" component="span"/>
                    </div>

                    <button className={css.formBtn} type="submit">Add contact</button>
                </Form>
            </Formik>
        </div>
        
    )

}