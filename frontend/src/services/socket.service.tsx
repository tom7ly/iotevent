import { io, Socket } from "socket.io-client";

export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  RECONNECT = "reconnect",
  IOTEVENT = "iotEvent",
  CONNECTION_ERROR = "connect_error",
  CONNECTION_TIMEOUT = "connect_timeout",
}

export interface IIotEvent {
  deviceId?: string;
  timestamp: Date;
  soundLevel: number;
}

export const initSocket = (dataCb: (data: IIotEvent) => void, connCb: (connected: boolean) => void): () => void => {
  const socket: Socket = io('http://localhost:3000');

  const errorHandler = (errorEvent: SocketEvents) => {
    const messages = {
      [SocketEvents.CONNECTION_ERROR]: 'Unable to connect to the socket',
      [SocketEvents.CONNECTION_TIMEOUT]: 'Connection to the socket timed out',
    };
    connCb(false);
    console.log(messages[errorEvent]);
  };

  const iotEventHandler = (data: IIotEvent) => {
    connCb(true);
    dataCb(data);
  };

  [SocketEvents.CONNECTION_ERROR, SocketEvents.CONNECTION_TIMEOUT].forEach(event => {
    socket.on(event, () => errorHandler(event));
  });

  socket.on(SocketEvents.IOTEVENT, iotEventHandler);

  const cleanup = (): void => {
    socket.off(SocketEvents.IOTEVENT, iotEventHandler);
    [SocketEvents.CONNECTION_ERROR, SocketEvents.CONNECTION_TIMEOUT].forEach(event => {
      socket.off(event, () => errorHandler(event));
    });
    socket.disconnect();
  };

  return cleanup;
};