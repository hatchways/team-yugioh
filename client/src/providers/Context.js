import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// CREATE USER CONTEXT
export const UserContext = createContext();

//CUSTOM HOOKS
// Get Auth
export const useAuth = () => {
  // Usage:
  // const authenticated = useAuth();
  const authenticated = useContext(UserContext).authenticated;
  return authenticated;
};
// Set Auth
export const useSetAuthenticated = () => {
  // Usage:
  // const setAuthenticated = useSetAuthenticated();
  // setAuthenticated(true) OR setAuthenticated(false);
  const setAuthenticated = useContext(UserContext).setAuthenticated;
  return setAuthenticated;
};
// Get User Data
export const useUserData = () => {
  // Usage:
  // const userData = useUserData();
  // {_id, email, name, googleCredentials, photoUrl, URL, stripeId, subscribed, subscriptionId, ...}
  return useContext(UserContext).userData;
};

// Set User Data
export const useSetUserData = () => {
  // Usage:
  // const setUserData = useSetUserData();
  // setUserData({...current, <updatedkey>})
  return useContext(UserContext).setUserData;
};

// CONTEXT PROVIDER SET UP
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  // Gets User Data from DB
  useEffect(() => {
    axios
      .get("/api/user/data")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
