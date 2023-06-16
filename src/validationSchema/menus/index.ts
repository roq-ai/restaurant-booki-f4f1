import * as yup from 'yup';

export const menuValidationSchema = yup.object().shape({
  dish_name: yup.string().required(),
  description: yup.string(),
  price: yup.number().integer().required(),
  restaurant_id: yup.string().nullable().required(),
});
