import { UkeyInstance, Credentials } from './types';
/** Opens and reads the credentials file, returning it as a dictionary.
 * @param {string} credentialsPath Path to credentials file
 * @returns {Credentials} An object of username and password
 */
export declare function getCredentials(credentialsPath: string): Credentials;
export declare function writeCredentials(credentialsPath: string, credentials: Credentials): void;
/** Returns a puppeteer browser after logging in on UKEY.
 * @param {Credentials} credentials An object that contains username and password
 * @returns {UkeyInstance} An object of browser and page objects
 */
export declare function loginToUkey(credentials: Credentials): Promise<UkeyInstance>;
