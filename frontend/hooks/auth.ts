import { User } from 'types';
import axios from 'axios';
import log from 'loglevel';
import { FindUserParams, LoginParams, RegisterParams } from 'utils/validation';

export function useLogin(): (variables: LoginParams) => Promise<String> {
  return (async ({ email, password }: LoginParams): Promise<String> => {
    try {
      log.debug('call Login');
      const { data: { access_token: accessToken } } = await axios({
        method: 'post',
        url: 'http://localhost:4000/auth/login',
        timeout: 4000,
        data: {
          email,
          password,
        },
      });
      window.localStorage.setItem('token', accessToken);
      log.debug('Login success');
      return (accessToken);
    } catch (err) {
      log.error(new Error(`Login failed:${err}`));
    }
  });
}

export function useRegister(): (variables: RegisterParams) => Promise<User> {
  return (async ({ username, email, password }: RegisterParams): Promise<User> => {
    try {
      log.debug('call Register');
      const resp = await axios({
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
      return resp.data;
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
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      log.debug('call User (me) success');
      return (resp.data);
    } catch (err) {
      log.error(new Error(`User (me) failed:${err}`));
      return (null);
    }
  });
}

export function useFindUser(): (variables: FindUserParams) => Promise<[FindUserParams] | null> {
  return (async ({ email }: FindUserParams): Promise<[FindUserParams] | null> => {
    try {
      log.debug('call User (me)');
      const resp = await axios({
        method: 'get',
        url: 'http://localhost:4000/users/',
        timeout: 4000,
        data: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      log.debug('call User (me) success');
      return (resp.data);
    } catch (err) {
      log.error(new Error(`User (me) failed:${err}`));
      return (null);
    }
  });
}