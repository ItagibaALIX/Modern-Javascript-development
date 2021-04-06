import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { User } from 'types';
import {
  USER, LOGOUT, REGISTER, LOGIN,
} from 'queries';

import { LoginParams, RegisterParams } from 'utils/validation';

export interface UseUserProps {
  id: string;
}

export enum Status {
  NO_USER = 'noUser',
  LOADING = 'loading',
}

export function useUser({ id }: UseUserProps): User | Status {
  const { data, loading, error } = useQuery<{ user: User }>(USER, {
    variables: { id },
  });

  if (loading) {
    return Status.LOADING;
  }

  if (error || !data || !data.user) {
    return Status.NO_USER;
  }

  return data.user;
}

export function useLogout(): () => Promise<void> {
  const router = useRouter();
  const [logout] = useMutation<{ logout: User}>(LOGOUT, {
    onError: (e) => {
      if (e.graphQLErrors[0]?.extensions?.code === 'FORBIDDEN') {
        // eslint-disable-next-line no-console
        console.log('User not logged in');
      }
    },
    onCompleted: () => router.reload(),
  });

  return (async (): Promise<void> => {
    await logout();
  });
}

export function useRegister(): (variables: RegisterParams) => Promise<void> {
  const router = useRouter();
  const [register] = useMutation<{register: User}, RegisterParams>(REGISTER, {
    onError: (e) => {
      if (e.graphQLErrors[0]?.extensions?.code === 'FORBIDDEN') {
        // eslint-disable-next-line no-console
        console.log('User already exists');
      }
    },
    onCompleted: () => {
      router.push('/');
    },
    update: (cache, { data: { register: viewer } }) => {
      cache.writeQuery({
        query: USER,
        data: { viewer },
      });
    },
  });

  return (async (variables: RegisterParams): Promise<void> => {
    await register({ variables });
  });
}

export function useLogin(): (variables: LoginParams) => Promise<void> {
  const router = useRouter();
  const [login] = useMutation<{ login: User}, LoginParams>(LOGIN, {
    onError: (e) => {
      if (e.graphQLErrors[0]?.extensions?.code === 'FORBIDDEN') {
        // eslint-disable-next-line no-console
        console.log('Invalid email or password');
      }
    },
    onCompleted: () => {
      router.push('/');
    },
    update: (cache, { data: { login: viewer } }) => {
      cache.writeQuery({
        query: USER,
        data: { viewer },
      });
    },
  });

  return (async (variables: LoginParams): Promise<void> => {
    await login({ variables });
  });
}
