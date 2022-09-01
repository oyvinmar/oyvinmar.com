import { getTime } from '../../helpers';
import { Event } from '../../types';

interface Items {
  checkin_id: number;
  rating_score: number;
  beer: {
    beer_name: string;
  };
  brewery: {
    brewery_name: string;
  };
  created_at: string;
}

interface Data {
  response: {
    checkins: {
      items: Items[];
    };
  };
}
export async function loader(): Promise<Event[]> {
  let response = await fetch(
    `https://api.untappd.com/v4/user/checkins/oyvinmar?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}`,
    {},
  );

  let data: Data = await response.json();

  return data.response.checkins.items.map(
    (item): Event => ({
      id: item.checkin_id.toString(),
      url: `https://untappd.com/user/oyvinmar/checkin/${item.checkin_id}`,
      date: item.created_at,
      content: `Gave ${item.rating_score} stars to ${item.beer.beer_name} from ${item.brewery.brewery_name}.`,
      timestamp: getTime(item.created_at),
      serviceName: 'Untappd',
      serviceUrl: 'https://untappd.com/',
      group: [],
    }),
  );
}
