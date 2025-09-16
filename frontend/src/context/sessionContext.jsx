import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getCartDataFromserver, getSessionFromServer } from "../service/productItemService";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const checkSession = async () => {
            const data = await getSessionFromServer();
            if (data.isLoggedin) {
                setSession(data.user);
            } else {
                setSession(null);
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await getCartDataFromserver();
            setCartItems(response||[]);
        }
        fetchItems();
    }, []);
    return (
        <SessionContext.Provider value={{ session, setSession,cartItems,setCartItems }}>
            {children}
        </SessionContext.Provider>
    );
};