import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [photoUrl, setPhotoUrl] = useState('');
  
  return (
    <UserContext.Provider value={{ photoUrl, setPhotoUrl }}>
      {props.children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
