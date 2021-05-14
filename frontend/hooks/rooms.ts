import log from 'loglevel';
import axios from 'axios';

import { Room } from '../types';

export default function useRooms(): () => Promise<[Room]> {
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
