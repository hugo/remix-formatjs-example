import type { IntlShape } from '@formatjs/intl';
import type { LoaderFunction } from 'remix';
import { createIntl, createIntlCache } from '@formatjs/intl';

import { messages } from './intl/messages';

export let getMessages = (locale: string) => messages[locale] ?? messages.en;

let cache = createIntlCache();

type Next = (intl: IntlShape) => ReturnType<LoaderFunction>;

export let withIntl = (
  locale: string,
  messages: Record<string, string>,
  next: Next
) =>
  next(
    createIntl(
      {
        locale: 'en',
        defaultLocale: 'en',
        messages,
      },
      cache
    )
  );
