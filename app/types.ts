export type ServiceName =
  | 'Twitter'
  | 'Pinboard'
  | 'Swarm'
  | 'Github'
  | 'Strava'
  | 'Untappd';

export interface Event {
  id: string;
  content: string;
  url: string;
  image?: string;
  date: string;
  timestamp: number;
  serviceName: ServiceName;
  serviceUrl: string;
  group: Event[];
}
