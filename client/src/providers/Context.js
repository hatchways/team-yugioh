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

// Check whether the app is still fetching auth state
// Usage:
// const loading = useAuthLoading(); // true or false
export const useAuthLoading = () => useContext(UserContext).authLoading;

// Check whether the app is still fetching user data
// Usage:
// const loading = useDataLoading(); // true or false
export const useDataLoading = () => useContext(UserContext).dataLoading;

// CONTEXT PROVIDER SET UP
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  // Gets User Data from DB
  useEffect(() => {
    if (authenticated) {
      axios
        .get("/api/user/data")
        .then(res => {
          setUserData(res.data);
          setDataLoading(false);
        })
        .catch(() => {
          setDataLoading(false);
        });
    }
  }, [authenticated]);

  useEffect(() => {
    axios
      .get("/api/authentication/test", { withCredentials: true })
      .then(() => {
        console.log("authenticated");
        setAuthenticated(true);
        setAuthLoading(false);
      })
      .catch(() => {
        setAuthLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        authenticated,
        setAuthenticated,
        authLoading,
        dataLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.object
};
