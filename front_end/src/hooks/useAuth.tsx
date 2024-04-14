import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = (): any => {
    const { auth } = useContext(AuthContext); // Add type annotation
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");
    return useContext(AuthContext);
}

export default useAuth;