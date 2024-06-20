import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations"; 
import toast, { Toaster } from 'react-hot-toast';
import { useId } from "react";


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
                <Form>
                    <div>
                        <label htmlFor={nameFieldId}>Name</label>
                        <Field type="text" name="name" id={nameFieldId}></Field>
                        <ErrorMessage name="name" component="span"/>
                    </div>
                    <div>
                        <label htmlFor={emailFieldId}>Email</label>
                        <Field type="email" name="email" id={emailFieldId}></Field>
                        <ErrorMessage name="email" component="span"/>
                    </div>

                    <div>
                        <label htmlFor={passwordFieldId}>Password</label>
                        <Field type="password" name="password" id={passwordFieldId}></Field>
                        <ErrorMessage name="password" component="span"/>
                    </div>

                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
        
    )
}