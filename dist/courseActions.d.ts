import { CourseWithoutItems, CourseItem, UkeyInstance } from './types.js';
/** Gets items listed on a page, returning an array of course objects.
 * @param {string} credentialsPath Path to credentials file
 * @param {string} courseLink URL link to course's main page
 * @returns {Promise<CourseItem[] | undefined>} An array of course item objects
 */
export declare function getItems(credentialsPath: string, courseLink: string): Promise<CourseItem[] | undefined>;
/** Gets items listed on a page, returning an array of course objects.
 * @param {UkeyInstance} loggedInInstance An UkeyInstance
 * @param {string} courseLink URL link to course's main page
 * @returns {Promise<CourseItem[] | undefined>} An array of course item objects
 */
export declare function getItemsInstance(loggedInInstance: any, courseLink: string): Promise<CourseItem[] | undefined>;
/** Fetches all items of a course and saves a database file
 * @param {string} databaseOutputFilePath Path to database output file
 * @param {UkeyInstance} loggedInInstance A puppeteer.Page object that is logged into UKEY
 * @param {CourseWithoutItems[]} allCoursesList An array of all courses taken by the student
 */
export declare function createCourseDatabaseFile(databaseOutputFilePath: string, loggedInInstance: UkeyInstance, allCoursesList: CourseWithoutItems[]): Promise<void>;
