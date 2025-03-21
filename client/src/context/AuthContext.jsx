import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedin, setLoggedIn] = useState(false);

    async function checkCurrentUser() {
        // ✅ Fix: Correct API route and include credentials
        const resp = await fetch('/api/check_current_user', {
            method: 'GET',
            credentials: 'include',  // ✅ Ensures session cookies are sent
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (resp.status === 200) {
            const data = await resp.json();
            login_user(data);
        } else {
            logout_user();
        }
    }

    const login_user = (user) => {
        setCurrentUser(user);
        setLoggedIn(true);
    };

    const logout_user = async () => {
        await fetch("/api/logout", {
            method: "DELETE",
            credentials: "include",
        });

        setCurrentUser(null);
        setLoggedIn(false);
    };

    useEffect(() => {
        checkCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, loggedin, setLoggedIn, login_user, logout_user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
