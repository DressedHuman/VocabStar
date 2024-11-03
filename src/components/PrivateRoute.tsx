import { useSelector } from "react-redux";
import Login from "./Login/Login";
import { RootState } from "../app/store";

interface Props {
    children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Login />;
    }
    return children;
};

export default PrivateRoute;