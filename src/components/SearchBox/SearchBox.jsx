import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/selectors";
import s from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const handleFilterChange = filter => dispatch(changeFilter(filter));
  return (

    <div className={s.searchBoxContainer}>
      <label className={s.searchBoxLabel}>
        Find contacts by name
        <input
          className={s.searchBoxInput}
          type="text"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};


export default SearchBox;