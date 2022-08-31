import { client, q } from '../../fauna.server';
import { Event } from '../../types';

interface Token {
  expires_at: number;
  access_token: string;
  refresh_token: string;
}

interface Activity {
  id: number;
  type: string;
  name: string;
  distance: number;
  moving_time: number;
  start_date_local: string;
  map: { summary_polyline: string };
}

async function fetchActivities(accessToken: string) {
  const response = await fetch(`https://www.strava.com/api/v3/activities`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const activities: Activity[] = await response.json();
  return activities.map((activity) => ({
    id: activity.id,
    type: activity.type,
    name: activity.name,
    distance: activity.distance,
    moving_time: activity.moving_time,
    start_date_local: activity.start_date_local,
    map: activity.map,
  }));
}

function activityToEvent(activity: Activity): Event {
  const ACTIVITY_MAP: { [key: string]: string } = {
    Ride: 'Cycled',
    Run: 'Ran',
    Hike: 'Hiked',
    NordicSki: 'Cross-country skied',
  };

  let activityType = ACTIVITY_MAP[activity.type] ?? activity.type;
  let distance = (activity.distance / 1000).toFixed(1);
  let hours = (activity.moving_time / 3600).toFixed();
  let minutes = ((activity.moving_time % 3600) / 60).toFixed();

  return {
    id: activity.id.toString(),
    url: `https://www.strava.com/activities/${activity.id}`,
    content: `${activityType} ${distance} kilometers in ${hours}h ${minutes}m.`,
    image: activity.map.summary_polyline,
    date: activity.start_date_local,
    timestamp: new Date(activity.start_date_local).getTime(),
    serviceName: 'Strava',
    serviceUrl: 'https://strava.com/',
    group: [],
  };
}

async function refreshToken(refreshToken: string) {
  const response = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=2065&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    { method: 'POST' },
  );
  return response.json();
}

export async function loader(): Promise<Event[]> {
  try {
    if (!client) {
      throw new Error('Missing secret to connect to FaunaDB');
    }

    const { data } = await client.query<{ data: Token }>(
      q.Get(q.Ref(q.Collection('tokens'), '276457023357321733')),
    );

    let activities = [];
    if (data.expires_at > Date.now() / 1000 + 60) {
      activities = await fetchActivities(data.access_token);
    } else {
      const newToken = await refreshToken(data.refresh_token);

      await client.query(
        q.Update(q.Ref(q.Collection('tokens'), '276457023357321733'), {
          data: newToken,
        }),
      );

      activities = await fetchActivities(newToken.access_token);
    }
    return activities.map(activityToEvent);
  } catch (error) {
    throw new Error('Fetch error');
  }
}
