import { BsPhone, BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { selectDeletingIds } from '../../redux/contacts/selectors';
import { deleteContact } from '../../redux/contacts/operations';


import s from './Contact.module.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const deletingIds = useSelector(selectDeletingIds);
  const isDeleting = deletingIds.includes(id);

  const handleDelete = () => {
    if (!isDeleting) {
      dispatch(deleteContact(id));
    }
  };

  return (
    <div className={s.contactContainer}>
      <ul className={s.contactDetailsList}>
        <li className={s.contactName}>
          <BsPerson className={s.contactIcon} size="18" />
          {name}
        </li>
        <li className={s.contactNumber}>
          <BsPhone className={s.contactIcon} size="18" />
          {number}
        </li>
      </ul>
      <button 
      className={s.contactDeleteBtn} 
      onClick={handleDelete}
      disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}{' '}
      </button>
    </div>
  );
};

export default Contact;