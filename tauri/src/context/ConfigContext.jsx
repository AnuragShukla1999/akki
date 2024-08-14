import { createContext, useEffect, useState } from "react";

// this is for Auth and Product Storage context api
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState([]);

    // const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, product, setProduct }}>{children}</AuthContext.Provider>
    );
};

export { AuthContextProvider };
