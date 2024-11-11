import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { authenticated_user, login, logout, register } from "../endpoints/api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    
    const get_authenticated_user = async () => {
        try {
          const user = await authenticated_user();
          setUser(user);
        } catch (error) {
          setUser(null); 
        } finally {
          setLoading(false); 
        }
    };

    const login_user = async (username, password) => {
        const user = await login(username, password)
        if (user) {
          setUser(user)
          nav('/')
        } else {
          alert('Incorrect username or password')
        }
    }

    const logoutUser = async () => {
      await logout();
      nav('/login')
    }

    const register_user = async (username, email, password, confirm_password) => {
      try {
        if (password === confirm_password) {
          await register(username, email, password)
          alert('User successfully registered')
          nav('/login')
        }
      } catch {
        alert('error registering user')
      }
    }

    useEffect(() => {
        get_authenticated_user();
    },)

    return (
        <AuthContext.Provider value={{ user, loading, login_user, logoutUser, register_user }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);