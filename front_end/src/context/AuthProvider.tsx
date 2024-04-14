import { createContext, useState } from "react";

interface AuthContextProps {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
    auth: {},
    setAuth: () => { },
    persist: false,
    setPersist: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(
        JSON.parse(localStorage.getItem("persist") || "") || false
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;