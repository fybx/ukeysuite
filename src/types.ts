export interface CourseWithoutItems {
    href: string;
    courseName: string;
    courseCode: string;
}

export interface CourseItem {
    itemName: string;
    itemWeek: string;
    itemType: string;
    itemLink: string;
}

export interface CourseWithItems {
    course: CourseWithoutItems;
    items: CourseItem[] | undefined;
}

export interface CourseItemDatabase {
    creationEpoch: number;
    courses: CourseWithItems[];
    courseCount: number;
    checksums: string[];
}

export interface Credentials {
    username: string;
    password: string;
}

