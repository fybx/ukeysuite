import { launch } from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { UkeyInstance, Credentials } from './types';

const urlUkey = 'https://ukey.uludag.edu.tr/Home';
const selectorRadioOgrenci =
    'body > div > div.row > div > div.body.col-lg-12 > div.row.bg-white.no-padding > div.pull-right.col-lg-5 > form > div.form-group.text-black.text-justify > input:nth-child(1)';
const selectorButtonLogin =
    'body > div > div.row > div > div.body.col-lg-12 > div.row.bg-white.no-padding > div.pull-right.col-lg-5 > form > div:nth-child(4) > button';

/** Opens and reads the credentials file, returning it as a dictionary.
 * @param {string} credentialsPath Path to credentials file
 * @returns {Credentials} An object of username and password
 */
export function getCredentials(credentialsPath: string): Credentials {
    return JSON.parse(readFileSync(credentialsPath, 'utf-8'));
}

export function writeCredentials(credentialsPath: string, credentials: Credentials): void {
    writeFileSync(credentialsPath, JSON.stringify(credentials, null, 4));
}

