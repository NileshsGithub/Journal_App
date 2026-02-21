import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('journal-user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('journal-user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        const userObj = {
            userName: userData.userName,
            userId: userData.userId || userData.id,
            credentials: btoa(`${userData.userName}:${userData.password}`),
        };
        setUser(userObj);
        localStorage.setItem('journal-user', JSON.stringify(userObj));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('journal-user');
    };

    const getAuthHeader = () => {
        if (user?.credentials) {
            return `Basic ${user.credentials}`;
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, getAuthHeader }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
