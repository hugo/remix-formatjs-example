import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix';
import { Meta, Links, Scripts, useRouteData, LiveReload } from 'remix';
import { Outlet } from 'react-router-dom';
import cookie from 'cookie';

import stylesUrl from './styles/global.css';
import { getMessages } from './intl';
import { IntlProvider } from 'react-intl';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  console.log();

  let locale =
    cookie.parse(request.headers.get('Cookie') ?? '').locale ??
    request.headers.get('Accept-Language')?.split(',').shift() ??
    'en';
  let messages = getMessages(locale);

  return { date: new Date(), locale, messages };
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let data = useRouteData();

  return (
    <Document>
      <IntlProvider locale={data.locale} messages={data.messages}>
        <Outlet />
      </IntlProvider>
      <footer>
        <p>This page was rendered at {data.date.toLocaleString()}</p>
      </footer>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
