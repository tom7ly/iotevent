export interface IIotEvent {
    deviceId?: string;
    timestamp: Date;
    soundLevel: number;
}

export const generateIotEvent = (): IIotEvent => {
    return {
        deviceId:Math.random().toString(36).substring(7),
        timestamp: new Date(),
        soundLevel: Math.random() * 100
    }
}