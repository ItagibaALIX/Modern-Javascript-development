export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface Message {
  room: string;
  sender: string;
  message: string;
}
