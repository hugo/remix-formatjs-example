import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
} from 'remix';
import { useRouteData } from 'remix';
import { FormattedMessage } from 'react-intl';
import cookie from 'cookie';

import { withIntl } from '../intl';
import stylesUrl from '../styles/index.css';

export let meta: MetaFunction = ({ parentsData: { root } }) =>
  withIntl(root.locale, root.messages, (intl) => ({
    title: intl.formatMessage({ id: 'index.title' }),
  }));

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return { message: 'index.message' };
};

export let action: ActionFunction = async ({ request }) => {
  let { locale } = Object.fromEntries(
    new URLSearchParams(await request.text())
  );

  return redirect('/', {
    headers: {
      'Set-Cookie': cookie.serialize('locale', locale, { maxAge: 1_209_600 }),
    },
  });
};

export default function Index() {
  let data = useRouteData();

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>Welcome to Remix!</h2>
      <p>
        <a href="https://remix.run/dashboard/docs">Check out the docs</a> to get
        started.
      </p>
      <p>
        Message from the loader: <FormattedMessage id={data.message} />
      </p>
      <br />
      <br />
      <div>
        <form method="post">
          <fieldset>
            <legend>Change Locale</legend>
            <button name="locale" value="en">
              en
            </button>
            <button name="locale" value="en-GB">
              en-GB
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
