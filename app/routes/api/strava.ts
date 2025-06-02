import { Event } from '../../types';
import { get } from '@vercel/edge-config';

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

async function setToken(token: Token) {
  const configId = process.env.EDGE_CONFIG?.replace(
    'https://edge-config.vercel.com/',
    '',
  )?.split('?')[0];
  await fetch(`https://api.vercel.com/v1/edge-config/${configId}/items`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          operation: 'update',
          key: 'strava-token',
          value: token,
        },
      ],
    }),
  });
}

export async function loader(): Promise<Event[]> {
  try {
    const token = await get<Token>('strava-token');

    if (!token) {
      throw new Error('No tokens found in Edge Config');
    }

    let activities = [];
    if (token.expires_at > Date.now() / 1000 + 60) {
      activities = await fetchActivities(token.access_token);
    } else {
      const newToken = await refreshToken(token.refresh_token);
      await setToken(newToken);
      activities = await fetchActivities(newToken.access_token);
    }

    return activities.map(activityToEvent);
  } catch (error) {
    console.error(error);
    return [];
  }
}
