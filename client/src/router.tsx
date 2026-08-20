import { createBrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { AppLayout } from "./layouts/AppLayout"
import { Dashboard } from "./pages/Dashboard"
//import { Year, yearLoader } from "./pages/Year"
import { Year } from "./pages/Year"

import { Month, monthLoader } from "./pages/Month"

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, Component: Landing},
            // {path: "register", Component: Register},
            // {path: "login", Component: Login},
            {   
                path: "dashboard", 
                Component: AppLayout,
                children: [
                    { index: true, Component: Dashboard},
                    {
                        path: ":year",
                        // loader: yearLoader,
                        Component: Year
                    },
                    {
                        path: ":year/:month",
                        loader: monthLoader,
                        Component: Month
                    }
                ]
            }
        ]
    }
])
