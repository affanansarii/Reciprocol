import React, { createContext, useReducer } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
    isRegistered: false
};

// const navigate = useNavigate();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                token: action.payload.token,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isRegistered: true,
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                isRegistered: false,
            }
        default:
            return state;
    }
};

const apiUrl = 'http://localhost:5000';

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // let token = localStorage.getItem('token');
    // if(token){
    //     state.token = token;
    // }
    axios.defaults.headers.common[`Authorization`] = `Bearer ${state.token}`
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
            if (res.status === 200) {
                console.log('Successfully logged in', res)
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data,
                });

            } else {
                dispatch({ type: 'LOGOUT' });
                console.log('Error from login', res)
            }

        } catch (err) {
            dispatch({ type: 'LOGOUT' });
            console.log('Error from login', err);
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const res = await axios.post(`${apiUrl}/api/auth/register`, { name, email, password, role });
            if (res.status === 200) {
                console.log('Successfully registered', res)
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: res.data,
                });

            }
        } catch (error) {
            dispatch({
                type: 'REGISTER_ERROR',
            });
            console.log(error);
        }
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
