import { User } from 'types';
import axios from 'axios';
import log from 'loglevel';
import { LoginParams, RegisterParams } from 'utils/validation';

export function useLogin(): (variables: LoginParams) => Promise<User> {
  return (async ({ email, password }: LoginParams): Promise<User> => {
    try {
      log.debug('call Login');
      const data = await axios({
        method: 'post',
        url: 'http://localhost:4000/auth/login',
        timeout: 4000,
        data: {
          email,
          password,
        },
      });
      log.debug('Login success');

      return data.data as unknown as User;
    } catch (err) {
      
      log.error(new Error(`Login failed:${err}`));
    }
  });
}

export function useRegister(): (variables: RegisterParams) => Promise<User> {
  return (async ({ username, email, password }: RegisterParams): Promise<User> => {
    try {
      log.debug('call Register');
      const data = await axios({
        method: 'post',
        url: 'http://localhost:4000/auth/register',
        timeout: 4000,
        data: {
          username,
          email,
          password,
        },
      });
      log.debug('Register success');

      return data.data as unknown as User;
    } catch (err) {
      log.error(new Error(`Register failed:${err}`));
    }
  });
}

export function useUser(): () => Promise<User> {
  return (async (): Promise<User | null> => {
    try {
      log.debug('call User (me)');
      const resp = await axios({
        method: 'get',
        url: 'http://localhost:4000/users/me',
        timeout: 4000,
      });
      log.debug('call User (me) susccess');
      return (resp.data);
    } catch (err) {
      log.error(new Error(`User (me) failed:${err}`));
      return (null);
    }
  });
}
