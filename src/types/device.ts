export interface Event {
  id: string;
  temperature: number;
  humidity: number;
  isAlarm: boolean;
  timestamp: string;
}

export interface Device {
  id: string;
  name: string;
  location: string;
  integrationId?: string;
  recentEvents?: Event[];
}