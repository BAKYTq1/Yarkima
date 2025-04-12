import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CourseCover from "./components/CourseCover/CourseCover"
import FAQ from "./components/FAQ/FAQ";

import Quiz from "./components/Quiz/Quiz";

import Login from "./pages/SignIn/SignIn";
import Register from "./pages/Sign up/SignUp";
import Chat from "./components/Chat/Chat";


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
            {
                path: "FAQ",
                element: <FAQ />
            },
            {

                path: "Quiz",
                element: <Quiz />

                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "chat",
                element: <Chat />

            },
        ]
    }
])