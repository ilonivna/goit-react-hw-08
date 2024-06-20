import { useEffect, lazy } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import Layout from "../Layout/Layout";

import css from './App.module.css';
import RestrictedRoute from "../RestrictedRoute/RetrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(()=>import("../../pages/NotFoundPage/NotFoundPage"))


export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => { dispatch(refreshUser()); }, [dispatch]);

  return (
    isRefreshing ? <b>Refreshing user...</b> : (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage/>}/>} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage/>}/>}/>
          <Route path="/contacts" element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Layout>
    )
  )

}