import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import TakeTest from "./components/TakeTest/TakeTest";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/take_test",
                element: <PrivateRoute><TakeTest /></PrivateRoute>,
            }
        ]
    }
])