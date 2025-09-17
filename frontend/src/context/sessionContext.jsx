import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getCartDataFromserver } from "../service/productItemService";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (token) {
            setUser(JSON.parse(localStorage.getItem('user')));
        } else {
            setUser(null);
        }
    }, [token]);

    useEffect(() => {
        const fetchItems = async () => {
            if (token) {
                const response = await getCartDataFromserver();
                setCartItems(response);
            } else {
                setCartItems([]);
            }
        };
        fetchItems();
    }, [token]);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setCartItems([]);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const fetchCartItems = async () => {
        const response = await getCartDataFromserver();
        setCartItems(response);
    }


    return (
        <SessionContext.Provider value={{ user, token, cartItems, setCartItems, login, logout, refreshCart: fetchCartItems }}>
            {children}
        </SessionContext.Provider>
    );
};