import { getTime } from '../../helpers';
import { Event } from '../../types';

interface Bookmark {
  dt: string;
  d: string;
  u: string;
}

type Data = Bookmark[];

export async function loader(): Promise<Event[]> {
  let res = await fetch('https://feeds.pinboard.in/json/v1/u:oyvinmar/');
  const data: Data = await res.json();

  return data.map(
    (pin): Event => ({
      id: pin.dt,
      url: pin.u,
      date: pin.dt,
      content: pin.d,
      timestamp: getTime(pin.dt),
      serviceName: 'Pinboard',
      serviceUrl: 'pinboard.in',
      group: [],
    }),
  );
}
