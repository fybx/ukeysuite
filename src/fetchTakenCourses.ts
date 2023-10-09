import { loginToUkey, getCredentials } from './requiredUtility.js';
import { CourseWithoutItems, UkeyInstance } from './types.js';

const selectorUlDersler =
    'body > div > aside > section > div > div > div:nth-child(1) > div > div.inner > ul';
const urlMainPage = 'https://ukey.uludag.edu.tr/KontrolPaneli/';

/** Gathers taken courses from the unordered list in mainpage.
 * @param {string} credentialsPath Path to credentials file
 * @returns {Promise<CourseWithoutItems[] | undefined>} An array of course objects
 */
export async function fetchCourses(
    credentialsPath: string
): Promise<CourseWithoutItems[] | undefined> {
    return loginToUkey(getCredentials(credentialsPath))
        .then((result) => fetchCoursesInstance(result))
        .catch((err) => {
            console.error('An error occured while logging in:', err);
            return undefined;
        });
}

/** Gathers taken courses from the unordered list in mainpage.
 * @param {UkeyInstance} loggedInInstance An UkeyInstance
 * @returns {Promise<CourseWithoutItems[] | undefined>} An array of course objects
 */
export async function fetchCoursesInstance(
    loggedInInstance: UkeyInstance
): Promise<CourseWithoutItems[] | undefined> {
    if (!loggedInInstance) {
        console.error('TODO!');
        return undefined;
    }

    await Promise.all([
        loggedInInstance.page.goto(urlMainPage),
        loggedInInstance.page.waitForNavigation(),
    ]);

    return loggedInInstance.page.evaluate((selectorUl) => {
        const ul = document.querySelector(selectorUl);
        const aElements = ul!.querySelectorAll('a');
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
            .filter((el) => el !== undefined) as CourseWithoutItems[];
    }, selectorUlDersler);
}
