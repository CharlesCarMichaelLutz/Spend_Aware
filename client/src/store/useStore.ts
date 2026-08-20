import { create } from "zustand";

type AuthState = {
    accessToken: string
    createdAt: string
    email: string;
    id: number;
    username: string
    language: string
    currency: string
}

export const useStore = create<AuthState>(() => {
    return {
        auth: {},
    }
})

export function authorizeUser(responseObject) {
    useStore.setState({ auth: responseObject })
}
