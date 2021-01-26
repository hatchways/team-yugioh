import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


// AUTH CONTEXT
export const AuthContext = createContext();

export const useAuth = () => {
  // Usage:
  // const authenticated = useAuth();
  const authenticated = useContext(AuthContext).authenticated;
  return authenticated;
};

export const useSetAuthenticated = () => {
  // Usage:
  // const setAuthenticated = useSetAuthenticated();
  // setAuthenticated(true) OR setAuthenticated(false);
  const setAuthenticated = useContext(AuthContext).setAuthenticated;
  return setAuthenticated;
};

// USER DATA CONTEXT
export const UserContext = createContext();

// custom hook
export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

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
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
