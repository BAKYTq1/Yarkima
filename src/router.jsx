import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CourseCover from "./components/CourseCover/CourseCover"
import FAQ from "./components/FAQ/FAQ";

import Quiz from "./components/Quiz/Quiz";

import Login from "./pages/SignIn/SignIn";
import Register from "./pages/Sign up/SignUp";
import Chat from "./components/Chat/Chat";

import SubscriptionForm from "./components/Subscribe/SubscriptionForm";
import ErrorMessage from "./components/Subscribe/ErrorMessage";

import Personal from "./components/personal/Personal";
import Profile from "./components/Profile/Profile";
import Public from "./components/Public/Public";
import Addinfo from "./components/dopinfo/Add__info";
import Layout2 from "./components/Layout/ItemLayout/Layout2";
import Popular from "./components/popular/Popular";
import Layout3 from "./components/Layout/Layout2/Layout";
import Notfound from "./components/NotFound/Notfound";
import SupportChat from "./components/SupportChat/SupportChat";



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
            },
            {
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
            {

                path: "subscribe",
                element: <SubscriptionForm />,
            },
            {
                path: "/errormassege",
                element: <ErrorMessage />
            },
            {
                path: "catalog",
                element: <Popular />

            },
            {
                path: '*',
                element: <Notfound/>
            }
        ]
    },
    {
        path: 'infoblock',
        element: <Layout2/>,
        children: [
            {
                index: true,
                element: <Profile/>
            },
            {
                path: "addinfo",
                element: <Addinfo/>

            },
            {
                path: "public",
                element: <Public/>

            },
        ]
    },
    {
        path:'/personal',
        element: <Layout3/>,
        children: [
            {
                index: true,
                element: <Personal />

            },
            {
                path: 'supportchat',
                element: <SupportChat />

            },
        ]
    },
    {
        path: '*',
        element: <Notfound/>
    }
])