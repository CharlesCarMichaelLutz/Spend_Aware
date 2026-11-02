
export type User = {
    accessToken: string
    createdAt: string
    email: string;
    id: number;
    username: string;
}

export type UserResponse = {
    userId: number
}

export type VerifyEmail = {
    userId: number
    code: string 
}

export type Expense = {
    id: number;
    user_id: number;
    place: string;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
}

export type ExpenseResponse = {
    expenses: Expense[]
    totalCount: number
}

export type YearEntry = {
    year: number;
}

export type MonthList = {
    month: string;
}
