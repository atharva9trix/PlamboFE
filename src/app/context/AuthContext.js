import React, { createContext, useContext, useState, useEffect } from "react";
import { DUMMY_USERS } from "../../core/constants/authUsers";

const AuthContext = createContext();

const PREFIX = "plambo_";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(PREFIX + "authUser");
    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      localStorage.removeItem(PREFIX + "authUser");
      setUser(null);
    }
  }, []);

  const login = (username, password) => {
    const foundUser = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (foundUser) {
      localStorage.setItem(PREFIX + "authUser", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(PREFIX + "authUser");
    localStorage.removeItem(PREFIX + "selectedClient");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
