import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Protected = () => {
    const { token } = useContext(AuthContext);
    return token ? <Outlet /> : <Navigate to='/' />
};

export default Protected;