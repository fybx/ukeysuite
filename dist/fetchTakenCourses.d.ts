import { CourseWithoutItems, UkeyInstance } from './types.js';
/** Gathers taken courses from the unordered list in mainpage.
 * @param {string} credentialsPath Path to credentials file
 * @returns {Promise<CourseWithoutItems[] | undefined>} An array of course objects
 */
export declare function fetchCourses(credentialsPath: string): Promise<CourseWithoutItems[] | undefined>;
/** Gathers taken courses from the unordered list in mainpage.
 * @param {UkeyInstance} loggedInInstance An UkeyInstance
 * @returns {Promise<CourseWithoutItems[] | undefined>} An array of course objects
 */
export declare function fetchCoursesInstance(loggedInInstance: UkeyInstance): Promise<CourseWithoutItems[] | undefined>;
