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
exports.createCourseDatabaseFile = exports.getItemsByPage = exports.getItems = void 0;
const requiredUtility_js_1 = require("./requiredUtility.js");
const fs_1 = require("fs");
const ts_md5_1 = require("ts-md5");
const selectorTbody = 'body > div.wrapper.row-offcanvas.row-offcanvas-left.transparent > aside.right-side.row-offcanvas-bottom > section.content > div.row > div > div > div > div > div > div > table > tbody';
/** Gets items listed on a page, returning an array of course objects.
 * @param {string} credentialsPath Path to credentials file
 * @param {string} courseLink URL link to course's main page
 * @returns {Promise<CourseItem[] | undefined>} An array of course item objects
 */
function getItems(credentialsPath, courseLink) {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield (0, requiredUtility_js_1.loginToUkey)((0, requiredUtility_js_1.getCredentials)(credentialsPath));
        return getItemsByPage(instance, courseLink);
    });
}
exports.getItems = getItems;
/** Gets items listed on a page, returning an array of course objects.
 * @param {UkeyInstance} loggedInInstance An UkeyInstance
 * @param {string} courseLink URL link to course's main page
 * @returns {Promise<CourseItem[] | undefined>} An array of course item objects
 */
function getItemsByPage(loggedInInstance, courseLink) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([loggedInInstance.goto(courseLink), loggedInInstance.waitForNavigation()]);
        yield Promise.all([
            loggedInInstance.goto('https://ukey.uludag.edu.tr/Ogrenci/DersMateryalleri'),
            loggedInInstance.waitForNavigation(),
        ]);
        return yield loggedInInstance.evaluate((tbody) => {
            const table = document.querySelector(tbody);
            if (table && !table.querySelector('.grid-empty-text')) {
                const rows = table.querySelectorAll('tr');
                return Array.from(rows)
                    .map((r) => r.querySelectorAll('td'))
                    .map((el) => {
                    const itemLinkElement = el[6].querySelector('a.dosya');
                    const itemLink = itemLinkElement
                        ? itemLinkElement.getAttribute('href')
                        : undefined;
                    return {
                        itemName: el[1].innerText,
                        itemWeek: el[3].innerText,
                        itemType: el[5].innerText,
                        itemLink: itemLink,
                    };
                });
            }
            else {
                return undefined;
            }
        }, selectorTbody);
    });
}
exports.getItemsByPage = getItemsByPage;
/** Fetches all items of a course and saves a database file
 * @param {string} databaseOutputFilePath Path to database output file
 * @param {puppeteer.Page} loggedInInstance A puppeteer.Page object that is logged into UKEY
 * @param {} allCoursesList An array of all courses taken by the student
 */
function createCourseDatabaseFile(databaseOutputFilePath, loggedInInstance, allCoursesList) {
    return __awaiter(this, void 0, void 0, function* () {
        let database = {
            creationEpoch: Date.now(),
            courses: [],
            courseCount: 0,
            checksums: [],
        };
        for (let i = 0; i < allCoursesList.length; i++) {
            const items = yield getItemsByPage(loggedInInstance, allCoursesList[i].href);
            database.courses.push({
                course: allCoursesList[i],
                items: items,
            });
            database.courseCount++;
        }
        database = addChecksums(database);
        const databaseSerialized = JSON.stringify(database, null, 4);
        (0, fs_1.writeFileSync)(databaseOutputFilePath, databaseSerialized);
    });
}
exports.createCourseDatabaseFile = createCourseDatabaseFile;
function addChecksums(database) {
    if (database.courseCount == 0)
        console.error('Cannot add checksums to empty database');
    database.courses.forEach((course) => {
        if (course.items)
            course.items.forEach((item) => {
                database.checksums.push(ts_md5_1.Md5.hashStr(item.itemName + item.itemType + item.itemWeek));
            });
    });
    return database;
}
//# sourceMappingURL=courseActions.js.map