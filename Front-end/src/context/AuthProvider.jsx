import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // Check localStorage on mount to restore auth state
    const storedUser = localStorage.getItem("Users");
    const adminToken = localStorage.getItem("AdminToken");
    const adminData = localStorage.getItem("AdminData");

    if (adminToken && adminData) {
      try {
        const admin = JSON.parse(adminData);
        setAuthUser({
          ...admin,
          isAdmin: true,
          isAuthenticated: true
        });
      } catch (error) {
        console.error("Failed to parse admin data:", error.message);
        localStorage.removeItem("AdminToken");
        localStorage.removeItem("AdminData");
        setAuthUser(null);
      }
    } else if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthUser({
          ...user,
          isAdmin: false,
          isAuthenticated: true
        });
      } catch (error) {
        console.error("Failed to parse user data:", error.message);
        localStorage.removeItem("Users");
        setAuthUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;