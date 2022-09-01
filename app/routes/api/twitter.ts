import { getTime } from '../../helpers';
import { Event } from '../../types';
import OAuth from 'oauth';

interface Tweet {
  id_str: string;
  text: string;
  created_at: string;
}

export async function loader(): Promise<Event[]> {
  let promise = new Promise<Tweet[]>((resolve) => {
    new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TWITTER_CONSUMER_KEY as string,
      process.env.TWITTER_CONSUMER_SECRET as string,
      '1.0A',
      null,
      'HMAC-SHA1',
    ).get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json',
      process.env.TWITTER_ACCESS_TOKEN as string,
      process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
      (e, data, res) => resolve(JSON.parse(data as string) as Tweet[]),
    );
  });

  let tweets = await promise;

  return tweets.map(
    (tweet): Event => ({
      id: tweet.id_str,
      url: `https://twitter.com/#!/oyvinmar/status/`,
      date: tweet.created_at,
      content: tweet.text,
      timestamp: getTime(tweet.created_at),
      serviceName: 'Twitter',
      serviceUrl: 'https://twitter.com/',
      group: [],
    }),
  );
}
