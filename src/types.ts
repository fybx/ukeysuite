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
