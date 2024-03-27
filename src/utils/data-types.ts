export type ToDo = {
    id: string;
    title: string;
    description: string;
    isComplete: boolean;
};

export type ToDoRecord = {
    PK: string;
    SK?: string;
    Title: string;
    Description: string;
    isComplete: false;
};

export type Role = "admin" | "basic" | "";

export type CurrentUser = {
    username: string;
    role: Role;
};

export type Category = "all" | "incomplete" | "complete";
