const faunadb = require('faunadb');
const fetch = require('minipass-fetch');

const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

async function fetchActivities(accessToken) {
  const response = await fetch(`https://www.strava.com/api/v3/activities`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const activities = await response.json();
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

async function refreshToken(refreshToken) {
  const response = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=2065&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    { method: 'POST' },
  );
  return response.json();
}

module.exports = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');

    if (!client) {
      res.statusCode = 500;
      res.end({ error: new Error('Missing secret to connect to FaunaDB') });
      return res;
    }

    const { data } = await client.query(
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
    res.statusCode = 200;
    res.end(JSON.stringify(activities));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ msg: 'fetch error' }));
  }
};
