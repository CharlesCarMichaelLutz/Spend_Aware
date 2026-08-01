
// export type User = {
//     id: number;
//     username: string;
//     email: string;
//     created_at: string;
// }

export type User = {
    accessToken: string
    createdAt: string
    email: string;
    id: number;
    username: string;
}

export type UserResponse = {
    accessToken: string
    createdAt: string
    email: string;
    id: number;
    username: string
    language: string
    currency: string
}

// export interface User {
//     accessToken: string
//     createdAt: string
//     email: string;
//     id: number;
//     username: string;
// }

export type Expense = {
    id: number;
    user_id: number;
    place: string;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
}

// export type YearEntry = { 
//     year: number; months: string[] 
// }

export type YearEntry = {
    year: number;
}

export type MonthList = {
    month: string;
}
