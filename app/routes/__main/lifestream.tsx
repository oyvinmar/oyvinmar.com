import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { loader as pinboardLoader } from '../api/pinboard';
import { loader as swarmLoader } from '../api/swarm';
import { Event } from '../../types';
import { EventList } from 'app/components/EventList';

function race<T>(promise: Promise<T[]>): Promise<T[]> {
  let timeout = new Promise<T[]>((res) => setTimeout(() => res([]), 3000));
  return Promise.race([promise, timeout]);
}

export async function loader() {
  let promises = [pinboardLoader, swarmLoader];

  let all: Array<Event[]> = await Promise.all(
    promises.map((promise) => race<Event>(promise())),
  );

  let sorted = all
    .flatMap((e) => e)
    .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));

  let now = Date.now();
  let nowMinusAYear = now - 1000 * 60 * 60 * 24 * 365;
  let filtered = sorted.filter((event) => event.timestamp > nowMinusAYear);

  let grouped = filtered.reduce<Event[]>((prev: Event[], current: Event, i) => {
    if (prev.length === 0) {
      return [current];
    }

    if (prev[prev.length - 1].serviceName === current.serviceName) {
      prev[prev.length - 1].group.push(current);
      return prev;
    }

    return [...prev, current];
  }, []);

  return json(grouped);
}
export default () => {
  const data = useLoaderData<Event[]>();
  return (
    <div className="space-y-5">
      <h1>What's happening?</h1>
      <div className="space-y-6">
        <EventList events={data} />
      </div>
    </div>
  );
};
