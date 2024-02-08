import { io } from "socket.io-client";

export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  RECONNECT = "reconnect",
  IOTEVENT = "iotevent",
}
export interface IIotEvent {
  deviceId?: string;
  timestamp: Date;
  soundLevel: number;
}
export interface ILabel  {
  timestamp: string;
}
export class Label implements ILabel {
  timestamp: string;
  constructor(timestamp: Date) {
    this.timestamp = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
}



const socket = io('http://localhost:3000');

export const initSocket = (callback: (data: IIotEvent) => void) => {
  socket.off('iotEvent');
  socket.on('iotEvent', (eventData: IIotEvent) => {
    callback(eventData);
  });

  return () => {
    socket.off('iotEvent');
  };
};