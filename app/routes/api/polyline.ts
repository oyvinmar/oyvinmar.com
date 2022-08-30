import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ request }) => {
  const params =
    request.url.replace(/.*api\/polyline\//, '') +
    `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  return fetch('https://maps.googleapis.com/maps/api/staticmap' + params);
};
