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
const courseActions_1 = require("./courseActions");
const fetchTakenCourses_1 = require("./fetchTakenCourses");
const requiredUtility_1 = require("./requiredUtility");
function play() {
    return __awaiter(this, void 0, void 0, function* () {
        const i = yield (0, requiredUtility_1.loginToUkey)((0, requiredUtility_1.getCredentials)('credentials.json'));
        const result = yield (0, fetchTakenCourses_1.fetchCoursesInstance)(i);
        if (result)
            yield (0, courseActions_1.createCourseDatabaseFile)('db.json', i.page, result);
        yield i.browser.close();
    });
}
play();
//# sourceMappingURL=playground.js.map