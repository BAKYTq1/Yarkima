import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CourseCover from "./components/CourseCover/CourseCover"

export const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            { path: "/", element: <Home/> },
            {
                path: "CourseCover",
                element: <CourseCover />,
            },
        ]
    }
])