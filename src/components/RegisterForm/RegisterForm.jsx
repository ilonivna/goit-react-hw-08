import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations"; 
import toast, { Toaster } from 'react-hot-toast';
import { useId } from "react";
import css from "./RegisterForm.module.css";


export default function RegisterForm() {
    const emailFieldId = useId();
    const passwordFieldId = useId();
    const nameFieldId = useId();

    const successToast = () => toast.success('Successfully registered!Now you can login');
    const errorToast = () => toast.error('There has been an error, try reloading the page');


    const ValidationSchema = Yup.object().shape({
        name: Yup.string().min(2, "Too short!").max(20, "Too long!").required("Required!"),
        email: Yup.string().email().required("Required!"),
        password: Yup.string().min(7, "Too short!").max(20, "Too long!").required("Required!"),
    });

    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        dispatch(register(values)).unwrap()
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
                    email: "",
                    password: "",
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
                        <label className={css.labelContainer} htmlFor={emailFieldId}>Email</label>
                        <Field className={css.input} type="email" name="email" id={emailFieldId}></Field>
                        <ErrorMessage className={caches.error} name="email" component="span"/>
                    </div>

                    <div className={css.container}>
                        <label className={css.labelContainer} htmlFor={passwordFieldId}>Password</label>
                        <Field className={css.input} type="password" name="password" id={passwordFieldId}></Field>
                        <ErrorMessage className={caches.error} name="password" component="span"/>
                    </div>

                    <button className={css.formBtn} type="submit">Register</button>
                </Form>
            </Formik>
        </div>
        
    )
}