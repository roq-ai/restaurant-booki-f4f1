import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  status: yup.string().required(),
  guest_id: yup.string().nullable().required(),
  table_id: yup.string().nullable().required(),
});
