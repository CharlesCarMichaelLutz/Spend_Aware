import { createBrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { AppLayout } from "./layouts/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { Year } from "./pages/Year"
import { Month } from "./pages/Month"

export const router = createBrowserRouter([
    {
       path: "/",
       children: [
        { index: true, Component: Landing},
        { path: "dashboard", Component: AppLayout,
            children: [
                { index: true, Component: Dashboard},
                { path: "year", Component: Year},
                { path: "month", Component: Month}
            ]
        }
       ] 
    }
])