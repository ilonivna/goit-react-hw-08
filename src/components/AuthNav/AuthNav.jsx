import { NavLink } from "react-router-dom"
import css from "./AuthNav.module.css";
export const AuthNav = () => {
    return (
        <div className={css.linkList}>
            <NavLink className={css.link} to="/register">
                Register
            </NavLink>
            <NavLink className={css.link} to="/login">
                Login
            </NavLink>
        </div>
    );
};