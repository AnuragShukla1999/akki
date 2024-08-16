import { createContext, useEffect, useState } from "react";

// this is for Auth and Product Storage context api
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const checkAuth = () => {
          const token = localStorage.getItem('user');
          setIsAuthenticated(!!token);
        };
    
        checkAuth();
      }, []);

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, product, setProduct, isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
    );
};

export { AuthContextProvider };
