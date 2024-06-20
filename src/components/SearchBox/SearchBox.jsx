import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/filters/selectors";

import css from "./SearchBox.module.css";
import {changeFilter} from "../../redux/filters/slice.js"

export default function SearchBox() {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    const handleFilter = (e) => {
        dispatch(changeFilter(e.target.value))
    }


    return (
        <div className={css.searchBox}>
            <p>Find contacts by name</p>
            <input className={css.input} type="text"
                value={filter}
                onChange={handleFilter}
            id="searchBox"/>
            <button className={css.btn} type="button">Find</button>
        </div>
    )
}