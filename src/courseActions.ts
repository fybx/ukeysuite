import { getCredentials, loginToUkey } from './requiredUtility.js';
import { writeFileSync } from 'fs';
import { CourseWithoutItems, CourseItemDatabase, CourseItem, UkeyInstance } from './types.js';
import { Md5 } from 'ts-md5';

const selectorTbody =
    'body > div.wrapper.row-offcanvas.row-offcanvas-left.transparent > aside.right-side.row-offcanvas-bottom > section.content > div.row > div > div > div > div > div > div > table > tbody';

