import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';

import styles from './tailwind.css';
import { ReactNode } from 'react';
import {
  useTheme,
  Theme,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
} from './components/ThemeProvider';
import { getThemeSession } from './theme.server';

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

interface DocumentProps {
  children: ReactNode;
  theme: Theme | null;
  ssrTheme: Theme | null;
}

function Document({ children, theme, ssrTheme }: DocumentProps) {
  return (
    <html lang="en" className={theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>oyvinmar.com</title>
        <Links />
        <ThemeHead theme={theme} ssrTheme={Boolean(ssrTheme)} />
      </head>
      <body className="bg-white text-gray-700 dark:text-gray-400 dark:bg-gray-900 antialiased">
        {children}
        <Scripts />
        <ThemeBody ssrTheme={Boolean(ssrTheme)} />
        <LiveReload />
      </body>
    </html>
  );
}

export type LoaderData = {
  theme: Theme | null;
};

function App({ children }: { children: ReactNode }) {
  const [theme] = useTheme();
  const data = useLoaderData<LoaderData>();

  return (
    <Document theme={theme} ssrTheme={data.theme}>
      {children}
    </Document>
  );
}

export default function Root() {
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App>
        <Outlet />
      </App>
    </ThemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App>
        <div className="error-container">
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </div>
      </App>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document ssrTheme="dark" theme="dark">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
