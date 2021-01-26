import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
export const useUserContext = () => {
  return useContext(UserContext).userData;
};
// Set User Data has Updated
export const useSetUserUpdatedContext = () => {
  return useContext(UserContext).setUserUpdated;
};

// CONTEXT PROVIDER SET UP
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);

  // Gets User Data from DB
  useEffect(() => {
    axios
      .get('/api/user/data')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/api/user/data')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
    setUserUpdated(false);
  }, [userUpdated]);

  return (
    <UserContext.Provider
      value={{ userData, setUserUpdated, authenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
