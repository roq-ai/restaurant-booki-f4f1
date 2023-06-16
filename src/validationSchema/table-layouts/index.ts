import * as yup from 'yup';

export const tableLayoutValidationSchema = yup.object().shape({
  table_number: yup.number().integer().required(),
  capacity: yup.number().integer().required(),
  restaurant_id: yup.string().nullable().required(),
});
