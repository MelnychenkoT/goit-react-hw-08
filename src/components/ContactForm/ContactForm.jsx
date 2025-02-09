import { useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { BsPhone, BsPerson, BsPersonAdd } from 'react-icons/bs';
import { addContact } from '../../redux/contacts/operations';
import { selectContacts, selectError } from '../../redux/contacts/selectors';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),
      number: Yup.string()
        .matches(/^\d+$/, 'Phone number must contain only digits')
        .min(7, 'Phone number must be at least 7 digits')
        .max(15, 'Phone number must be less than 15 digits')
        .required('Phone number is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const duplicate = contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      );

      if (duplicate) {
        alert(`${values.name} is already in contacts!`);
        return;
      }

      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
      <form autoComplete="off" onSubmit={formik.handleSubmit} className={s.contactFormWrap}>
        <h1 className={s.mainTitle}>Phonebook</h1>
        <label className={s.contactFormLabel} htmlFor="name">
          Name
        </label>
        <div className={s.contactFormInputWrap}>
          <input
            className={s.contactFormInput}
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="name"
          />
          {formik.touched.name && formik.errors.name ? (
        <div className={s.contactFormError}>{formik.errors.name}</div>
      ) : null}
          <BsPerson className={s.contactFormIcon} size="20" />
        </div>
        
        <label className={s.contactFormLabel} htmlFor="number">
          Number
        </label>
        <div className={s.contactFormInputWrap}>
          <input
            className={s.contactFormInput}
            type="text"
            name="number"
            id="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="tel"
          />
          {formik.touched.number && formik.errors.number ? (
        <div className={s.contactFormError}>{formik.errors.number}</div>
      ) : null}
      {error && <div className={s.contactFormError}>Error: {error}</div>}{' '}
          <BsPhone className={s.contactFormIcon} size="20" />
        </div>
        
        <button className={s.contactFormBtn} type="submit">
          <BsPersonAdd className={s.contactFormBtnIcon} size="15" />
          Add contact
        </button>
      </form>
  );
};

export default ContactForm;