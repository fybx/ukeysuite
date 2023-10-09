import { loginToUkey, getCredentials } from './requiredUtility.js';
import { CourseWithoutItems, UkeyInstance } from './types.js';

const selectorUlDersler =
    'body > div > aside > section > div > div > div:nth-child(1) > div > div.inner > ul';
const urlMainPage = 'https://ukey.uludag.edu.tr/KontrolPaneli/';

