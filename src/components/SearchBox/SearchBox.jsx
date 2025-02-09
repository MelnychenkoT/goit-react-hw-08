import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectFilterValue } from '../../redux/filters/selectors';
import s from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector(selectFilterValue);
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(changeFilter(e.target.value.toLowerCase()));
  };
  
  return (

    <div className={s.searchBoxContainer}>
      <label className={s.searchBoxLabel}>
      Find contacts by name or phone
        <input
          id="search"
          name="search"
          className={s.searchBoxInput}
          type="text"
          value={filter}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
    </div>
  );
};


export default SearchBox;