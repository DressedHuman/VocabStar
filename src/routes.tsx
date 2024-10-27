import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ]
    }
])