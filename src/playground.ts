import { createCourseDatabaseFile } from './courseActions';
import { fetchCoursesInstance } from './fetchTakenCourses';
import { getCredentials, loginToUkey } from './requiredUtility';

async function play() {
    const i = await loginToUkey(getCredentials('credentials.json'));
    const courses = await fetchCoursesInstance(i);
    courses!.forEach((course) => {console.log(course.courseName)});
    await i.browser.close();
}

play();