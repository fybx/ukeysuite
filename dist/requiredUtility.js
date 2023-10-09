"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginToUkey = exports.writeCredentials = exports.getCredentials = void 0;
const puppeteer_1 = require("puppeteer");
const fs_1 = require("fs");
const urlUkey = 'https://ukey.uludag.edu.tr/Home';
const selectorRadioOgrenci = 'body > div > div.row > div > div.body.col-lg-12 > div.row.bg-white.no-padding > div.pull-right.col-lg-5 > form > div.form-group.text-black.text-justify > input:nth-child(1)';
const selectorButtonLogin = 'body > div > div.row > div > div.body.col-lg-12 > div.row.bg-white.no-padding > div.pull-right.col-lg-5 > form > div:nth-child(4) > button';
/** Opens and reads the credentials file, returning it as a dictionary.
 * @param {string} credentialsPath Path to credentials file
 * @returns {{username: string, password: string}} An object of username and password
 */
function getCredentials(credentialsPath) {
    return JSON.parse((0, fs_1.readFileSync)(credentialsPath, 'utf-8'));
}
exports.getCredentials = getCredentials;
function writeCredentials(credentialsPath, credentials) {
    (0, fs_1.writeFileSync)(credentialsPath, JSON.stringify(credentials, null, 4));
}
exports.writeCredentials = writeCredentials;
/** Returns a puppeteer browser after logging in on UKEY.
 * @param {Credentials} credentials An object that contains username and password
 * @returns {UkeyInstance} An object of browser and page objects
 */
function loginToUkey(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield (0, puppeteer_1.launch)({ headless: false });
        const page = (yield browser.pages())[0];
        yield page.goto(urlUkey);
        yield page.waitForSelector('#KullaniciKodu');
        yield page.waitForSelector('#sifre');
        yield page.type('#KullaniciKodu', credentials.username);
        yield page.type('#sifre', credentials.password);
        yield page.click(selectorRadioOgrenci);
        yield page.click(selectorButtonLogin);
        return { browser, page };
    });
}
exports.loginToUkey = loginToUkey;
//# sourceMappingURL=requiredUtility.js.map