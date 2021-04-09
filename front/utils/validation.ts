import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export type LoginParams = Yup.InferType<typeof loginSchema>;

export const registerSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short, 8 characters minimum.'),
});

export type RegisterParams = Yup.InferType<typeof registerSchema>;

