
export type User = {
    id: number;
    username: string;
    email: string;
    created_at: string;
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

export type YearEntry = { 
    year: number; months: string[] 
}
