import fs from 'fs';
import path from 'path';

export let messages: Record<string, Record<string, string>> = {
  en: JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'app/i18n/en.json'), 'utf-8')
  ),
  'en-GB': JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'app/i18n/en-GB.json'), 'utf-8')
  ),
};
