import log from 'loglevel';
import axios from 'axios';

import { MessageSendParams } from '../utils/validation';

export default function useMessages(): (variables: MessageSendParams) => Promise<void> {
  return (async ({ message, room }: MessageSendParams): Promise<void> => {
    try {
      console.log('useMessages', message, room);
      log.debug('call Send', message, room);
      await axios({
        method: 'post',
        url: 'http://localhost:4000/messages/send',
        timeout: 4000,
        data: {
          message,
          room,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      log.debug('Send success');
    } catch (err) {
      log.error(new Error(`Send failed:${err}`));
    }
  });
}
