// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();


const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(storedUser);


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout,  }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => useContext(UserContext);

export default UserProvider