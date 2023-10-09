import { getCredentials, loginToUkey } from './requiredUtility.js';
import { writeFileSync } from 'fs';
import { CourseWithoutItems, CourseItemDatabase, CourseItem, UkeyInstance } from './types.js';
import { Md5 } from 'ts-md5';

const selectorTbody =
    'body > div.wrapper.row-offcanvas.row-offcanvas-left.transparent > aside.right-side.row-offcanvas-bottom > section.content > div.row > div > div > div > div > div > div > table > tbody';

/** Gets items listed on a page, returning an array of course objects.
 * @param {string} credentialsPath Path to credentials file
 * @param {string} courseLink URL link to course's main page
 * @returns {Promise<CourseItem[] | undefined>} An array of course item objects
 */
export async function getItems(
    credentialsPath: string,
    courseLink: string
): Promise<CourseItem[] | undefined> {
    const instance = await loginToUkey(getCredentials(credentialsPath));
    return getItemsInstance(instance, courseLink);
}

/** Gets items listed on a page, returning an array of course objects.
 * @param {UkeyInstance} loggedInInstance An UkeyInstance
 * @param {string} courseLink URL link to course's main page
 * @returns {Promise<CourseItem[] | undefined>} An array of course item objects
 */
export async function getItemsInstance(
    loggedInInstance: any,
    courseLink: string
): Promise<CourseItem[] | undefined> {
    await Promise.all([loggedInInstance.goto(courseLink), loggedInInstance.waitForNavigation()]);

    await Promise.all([
        loggedInInstance.goto('https://ukey.uludag.edu.tr/Ogrenci/DersMateryalleri'),
        loggedInInstance.waitForNavigation(),
    ]);

    return await loggedInInstance.evaluate((tbody: string) => {
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
        } else {
            return undefined;
        }
    }, selectorTbody);
}

/** Fetches all items of a course and saves a database file
 * @param {string} databaseOutputFilePath Path to database output file
 * @param {UkeyInstance} loggedInInstance A puppeteer.Page object that is logged into UKEY
 * @param {CourseWithoutItems[]} allCoursesList An array of all courses taken by the student
 */
export async function createCourseDatabaseFile(
    databaseOutputFilePath: string,
    loggedInInstance: UkeyInstance,
    allCoursesList: CourseWithoutItems[]
): Promise<void> {
    let database: CourseItemDatabase = {
        creationEpoch: Date.now(),
        courses: [],
        courseCount: 0,
        checksums: [],
    };

    for (let i = 0; i < allCoursesList.length; i++) {
        const items = await getItemsInstance(loggedInInstance, allCoursesList[i].href);
        database.courses.push({
            course: allCoursesList[i],
            items: items,
        });
        database.courseCount++;
    }

    database = addChecksums(database);
    const databaseSerialized = JSON.stringify(database, null, 4);
    writeFileSync(databaseOutputFilePath, databaseSerialized);
}

/**
 * Adds checksums for items in a database
 * @param {CourseItemDatabase} database A valid database file
 * @returns Database with checksums array modified 
 */
function addChecksums(database: CourseItemDatabase): CourseItemDatabase {
    if (database.courseCount == 0) console.error('Cannot add checksums to empty database');

    database.courses.forEach((course) => {
        if (course.items)
            course.items.forEach((item) => {
                database.checksums.push(Md5.hashStr(item.itemName + item.itemType + item.itemWeek));
            });
    });

    return database;
}
