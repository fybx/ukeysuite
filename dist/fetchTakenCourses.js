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
exports.fetchCoursesInstance = exports.fetchCourses = void 0;
const requiredUtility_js_1 = require("./requiredUtility.js");
const selectorUlDersler = 'body > div > aside > section > div > div > div:nth-child(1) > div > div.inner > ul';
const urlMainPage = 'https://ukey.uludag.edu.tr/KontrolPaneli/';
/** Gathers taken courses from the unordered list in mainpage.
 * @param {string} credentialsPath Path to credentials file
 * @returns {Promise<CourseWithoutItems[] | undefined>} An array of course objects
 */
function fetchCourses(credentialsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, requiredUtility_js_1.loginToUkey)((0, requiredUtility_js_1.getCredentials)(credentialsPath))
            .then((result) => fetchCoursesInstance(result))
            .catch((err) => {
            console.error('An error occured while logging in:', err);
            return undefined;
        });
    });
}
exports.fetchCourses = fetchCourses;
/** Gathers taken courses from the unordered list in mainpage.
 * @param {UkeyInstance} loggedInInstance An UkeyInstance
 * @returns {Promise<CourseWithoutItems[] | undefined>} An array of course objects
 */
function fetchCoursesInstance(loggedInInstance) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!loggedInInstance) {
            console.error('TODO!');
            return undefined;
        }
        yield Promise.all([
            loggedInInstance.page.goto(urlMainPage),
            loggedInInstance.page.waitForNavigation(),
        ]);
        return loggedInInstance.page.evaluate((selectorUl) => {
            const ul = document.querySelector(selectorUl);
            const aElements = ul.querySelectorAll('a');
            return Array.from(aElements)
                .map((a) => {
                if (a) {
                    const [courseCode, courseName] = a.innerText.split(' - ', 2);
                    return {
                        href: a.href,
                        courseName,
                        courseCode,
                    };
                }
            })
                .filter((el) => el !== undefined);
        }, selectorUlDersler);
    });
}
exports.fetchCoursesInstance = fetchCoursesInstance;
//# sourceMappingURL=fetchTakenCourses.js.map