import { createContext, useContext, useEffect, useState } from "react";

const ContextApi = createContext(null);

export const ContextProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem("JWT_TOKEN") || null);

  useEffect(() => {
    if (token) localStorage.setItem("JWT_TOKEN", token);
    else localStorage.removeItem("JWT_TOKEN");
  }, [token]);

  const value = { token, setToken };

  return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => useContext(ContextApi);
