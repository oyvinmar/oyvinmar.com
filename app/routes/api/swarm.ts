import { Event } from '../../types';

interface Venue {
  id: string;
  name: string;
}

interface Checkin {
  id: string;
  createdAt: number;
  venue: Venue;
}

interface Data {
  response: { checkins: { items: Checkin[] } };
}

export async function loader(): Promise<Event[]> {
  let response = await fetch(
    `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${process.env.FOURSQUARE_TOKEN}&m=swarm&v=20141808`,
  );

  let data: Data = await response.json();

  return data.response.checkins.items.map(
    ({ id, createdAt, venue }): Event => ({
      id,
      url: `https://foursquare.com/v/${venue.id}`,
      content: `Checked in at ${venue.name}.`,
      timestamp: createdAt * 1000,
      date: new Date(createdAt * 1000).toISOString(),
      serviceUrl: 'https://foursquare.com/',
      serviceName: 'Swarm',
      group: [],
    }),
  );
}
