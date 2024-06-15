import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";

import ContactList from "../ContactList/ContactList";
import ContactForm from "../ContactForm/ContactForm"
import SearchBox from "../SearchBox/SearchBox"
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

import css from './App.module.css';
import { selectError, selectLoading } from "../../redux/selectors";






export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => { dispatch(fetchContacts()) }, [dispatch]);

  return (
  <div>
  <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <Loader />}
      {isError && <Error/>}
      <ContactList/>
    </div>
  )

}