import { Links, LiveReload, Outlet, Scripts, useCatch } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node'; // or cloudflare/deno

import styles from './tailwind.css';
import { ReactNode } from 'react';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
const clientDarkAndLightModeElsCode = `
(function () {
  function checkDarkMode() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  function getColorModePreference() {
    const mode = localStorage.getItem('mode');
    if (mode) {
      return mode;
    } else if (checkDarkMode()) {
      return 'dark';
    }
    return 'light';
  }

  function toggleColorMode() {
    if (!document.documentElement.classList.contains('dark')) {
      localStorage.setItem('mode', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('mode', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  if (getColorModePreference() === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('light');
  }

  window.toggleColorMode = toggleColorMode;
  window.getColorModePreference = getColorModePreference;
})();
`;

function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>oyvinmar.com</title>
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: clientDarkAndLightModeElsCode,
          }}
        />
      </head>
      <body className="text-gray-700 dark:text-gray-400 dark:bg-gray-900 antialiased">
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document>
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
