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

/** Returns a puppeteer browser after logging in on UKEY.
 * @param {Credentials} credentials An object that contains username and password
 * @returns {UkeyInstance} An object of browser and page objects
 */
export async function loginToUkey(credentials: Credentials): Promise<UkeyInstance> {
    const browser = await launch({ headless: false });
    const page = (await browser.pages())[0];

    await page.goto(urlUkey);
    await page.waitForSelector('#KullaniciKodu');
    await page.waitForSelector('#sifre');
    await page.type('#KullaniciKodu', credentials.username);
    await page.type('#sifre', credentials.password);
    await page.click(selectorRadioOgrenci);
    await page.click(selectorButtonLogin);

    return { browser, page };
}
