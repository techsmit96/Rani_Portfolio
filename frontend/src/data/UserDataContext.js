// UserDataContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserData } from "./Api";

const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user datasssss:", error);
      }
    };

    fetchData();
  }, []); // Runs only once on component mount

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
