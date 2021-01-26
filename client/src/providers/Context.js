import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// USER  CONTEXT
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
// Get user Data
export const useUserContext = () => {
  return useContext(UserContext).userData;
};

// CONTEXT PROVIDER SET UP
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get('/api/user/data')
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{userData, authenticated, setAuthenticated}}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
