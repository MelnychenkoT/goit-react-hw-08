import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from "nanoid";
import * as Yup from 'yup';
import 'izitoast/dist/css/iziToast.min.css';
import { BsPhone, BsPerson, BsPersonAdd } from 'react-icons/bs';
import s from './ContactForm.module.css';
import { useDispatch } from "react-redux";
import { addContact } from '../../redux/contactsOps';

const initialValues = {
  id: '',
  name: '',
  number: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    actions.resetForm();
    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      })
    );
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form autoComplete="off" className={s.contactFormWrap}>
        <label className={s.contactFormLabel} htmlFor="name">
          Name
        </label>
        <div className={s.contactFormInputWrap}>
          <Field
            className={s.contactFormInput}
            type="text"
            name="name"
            id="name"
          />
          <BsPerson className={s.contactFormIcon} size="20" />
        </div>
        <ErrorMessage
          name="name"
          component="span"
          className={s.contactFormError}
        />

        <label className={s.contactFormLabel} htmlFor="number">
          Number
        </label>
        <div className={s.contactFormInputWrap}>
          <Field
            className={s.contactFormInput}
            type="text"
            name="number"
            id="number"
          />
          <BsPhone className={s.contactFormIcon} size="20" />
        </div>
        <ErrorMessage
          name="number"
          component="span"
          className={s.contactFormError}
        />

        <button className={s.contactFormBtn} type="submit">
          <BsPersonAdd className={s.contactFormBtnIcon} size="15" />
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;