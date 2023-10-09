import { createCourseDatabaseFile } from './courseActions';
import { fetchCoursesInstance } from './fetchTakenCourses';
import { getCredentials, loginToUkey } from './requiredUtility';

async function play() {
    const i = await loginToUkey(getCredentials('credentials.json'));
    const result = await fetchCoursesInstance(i);
    if (result) await createCourseDatabaseFile('db.json', i, result);
    await i.browser.close();
}

play();