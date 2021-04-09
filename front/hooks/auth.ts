import { User } from 'types';
import axios from 'axios';
import log from 'loglevel';

import { LoginParams, RegisterParams } from 'utils/validation';

export function useLogin(): (variables: LoginParams) => Promise<void> {
  return (async ({email, password}: LoginParams): Promise<void> => {
    try {
      log.debug('call Login');
      await axios({
        method: 'post',
        url: 'http://localhost:4000/auth/login',
        timeout: 4000,
        data: {
          email: email,
          password: password
        }
      });
      log.debug('Login success');
    } catch (err) {
      log.error(new Error('Login failed:' + err));
    }
  });
}

export function useRegister(): (variables: RegisterParams) => Promise<void> {
  return (async ({username, email, password}: RegisterParams): Promise<void> => {
    try {
      log.debug('call Register');
      await axios({
        method: 'post',
        url: 'http://localhost:4000/auth/register',
        timeout: 4000,
        data: {
          username: username,
          email: email,
          password: password
        }
      });
      log.debug('Register success');
    } catch (err) {
      log.error(new Error('Register failed:' + err));
    }
  });
}

export function useUser(): () => Promise<User> {
  return (async (): Promise<User> => {
    try {
      log.debug('call User (me)' );
      const resp = await axios({
        method: 'get',
        url: 'http://localhost:4000/users/me',
        // timeout: 300
      });
      log.debug('call User (me) susccess');
      return (resp.data);
    } catch (err) {
      log.error(new Error('User (me) failed:' + err));
    }
  });
}