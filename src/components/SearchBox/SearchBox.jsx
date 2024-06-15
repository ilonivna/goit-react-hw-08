import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/selectors";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css"

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