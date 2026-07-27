import axios from "axios";

// export const baseApi = axios.create({ baseURL: "http://localhost:8000" })

export const baseApi = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

// export const baseApi = axios.create({
//     baseURL: import.meta.env.VITE_SERVER_URL,
//     withCredentials: true
// })
//
// export const axiosPrivate = axios.create({
//     baseURL: import.meta.env.VITE_SERVER_URL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// })
