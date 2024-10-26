import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    }
])