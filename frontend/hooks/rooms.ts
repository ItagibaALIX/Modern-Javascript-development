import log from 'loglevel';
import axios from 'axios';
import { CreateRoomParams, InviteRoomParams } from 'utils/validation';

import { Room } from '../types';

export function useRooms(): () => Promise<[Room]> {
  return (async (): Promise<[Room] | null> => {
    try {
      log.debug('call Room (get)');
      const resp = await axios({
        method: 'get',
        url: 'http://localhost:4000/rooms',
        timeout: 4000,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      log.debug('call Room (get) success');
      return (resp.data);
    } catch (err) {
      log.error(new Error(`Room (get) failed:${err}`));
      return null;
    }
  });
}

export function useCreateRoom(): (variables: CreateRoomParams) => Promise<void> {
  return (async ({ name }: CreateRoomParams): Promise<void> => {
    try {
      log.debug('call Room (post)', name);
      const resp = await axios({
        method: 'post',
        url: 'http://localhost:4000/rooms',
        timeout: 4000,
        data: {
          name,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      log.debug('call Room (get) success');
      return (resp.data);
    } catch (err) {
      log.error(new Error(`Room (get) failed:${err}`));
      return null;
    }
  });
}

export function useInviteRoom(): (variables: InviteRoomParams) => Promise<void> {
  return (async ({ id, email }: InviteRoomParams): Promise<void> => {
    try {
      log.debug('call Room (post)', id, email);

      const resp = await axios({
        method: 'post',
        url: `http://localhost:4000/rooms/${id}/invite`,
        timeout: 4000,
        data: {
          email,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      log.debug('call Room (get) success');
      return (resp.data);
    } catch (err) {
      log.error(new Error(`Room (get) failed:${err}`));
      return null;
    }
  });
}
