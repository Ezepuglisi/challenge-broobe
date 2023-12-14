
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const endpointCreateUser = import.meta.env.VITE_ENDPOINT_CREATE_USER;
    const endpointLoginUser = import.meta.env.VITE_ENDPOINT_LOGIN_USER;

    const login = async (data, setErrorFindUser, setIsLoading, navigate) => {
        setIsLoading(true);

        try {
            const user = {
                email: data.username,
                password: data.password,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            };

            const res = await fetch(endpointLoginUser, options);
            const result = await res.json();

            if (result.message) {
                setErrorFindUser(true);
            } else if (result.token) {
                setToken(result.token);
                localStorage.setItem('token', result.token);
                setUser({
                    username: data.username,
                });
                localStorage.setItem('user', JSON.stringify({ username: data.username }));
                navigate('/');
            }
        } catch (error) {
            console.error('Error en el login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoadingUser(false);
    };

    const registerUser = async (data, navigate, setIsLoading) => {
        setIsLoading(true)
        const user = {
            name: data.username,
            email: data.email,
            password: data.password,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        try {
            const res = await fetch(endpointCreateUser, options);
            const result = await res.json();
        } catch (error) {
            console.error('Error en el registro:', error);
        } finally{
            setIsLoading(false)
            navigate('/login')

        }
    };

    useEffect(() => {
        const loadUser = async () => {
            setLoadingUser(true);
            try {
                if (localStorage.getItem('token')) {
                    setToken(localStorage.getItem('token'));
                    const storedUser = localStorage.getItem('user');
                    setUser(storedUser ? JSON.parse(storedUser) : null);
                } else {
                    setUser(null);
                    setToken(null);
                }
            } catch (error) {
                console.error('Error en la carga del usuario:', error);
            } finally {
                setLoadingUser(false);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        console.log(user, 'CONTEXT USER');
    }, [user]);

    return (
        <AuthContext.Provider value={{ token, login, logout, registerUser, user, loadingUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

