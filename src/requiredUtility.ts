import { launch } from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { UkeyInstance, Credentials } from './types';

const urlUkey = 'https://ukey.uludag.edu.tr/Home';
const selectorRadioOgrenci =
    'body > div > div.row > div > div.body.col-lg-12 > div.row.bg-white.no-padding > div.pull-right.col-lg-5 > form > div.form-group.text-black.text-justify > input:nth-child(1)';
const selectorButtonLogin =
    'body > div > div.row > div > div.body.col-lg-12 > div.row.bg-white.no-padding > div.pull-right.col-lg-5 > form > div:nth-child(4) > button';
