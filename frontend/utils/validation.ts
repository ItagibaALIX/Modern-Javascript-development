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

export const messageSendSchema = Yup.object().shape({
  message: Yup.string().required('Username is required'),
  room: Yup.string(),
});

export type MessageSendParams = Yup.InferType<typeof messageSendSchema>;

export const createRoomSchema = Yup.object().shape({
  name: Yup.string()
    .required('room name is required'),
  // .min(1, 'room name is too short, 1 characters minimum.'),
});

export type CreateRoomParams = Yup.InferType<typeof createRoomSchema>;

export const inviteRoomSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('room name is required'),
  id: Yup.string(),
});

export type InviteRoomParams = Yup.InferType<typeof inviteRoomSchema>;

export const findUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('room name is required'),
});

export type FindUserParams = Yup.InferType<typeof findUserSchema>;
