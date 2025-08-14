import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [record, setRecord] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [collapse, setCollapse] = useState(false);

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }

    useEffect(() => {
        
        if(localStorage.getItem('token') && localStorage.getItem('user')){
            setToken(JSON.parse(localStorage.getItem('token')));
            setUser(localStorage.getItem('user'));
        }
    }, [])

    const refreshRecord = (val) => {
        setRecord(val);
    }

    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')])

    return(
        <AppContext.Provider value={
            { 
                token, 
                user,
                record,
                refreshRecord,
                theme,
                logout,
                collapse,
                setCollapse
            }
        }>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider