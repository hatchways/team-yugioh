import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();
export const UserUpdateContext = createContext();

export function UserContextProvider(props) {
  const [url, setUrl] = useState('');

  const updateUser = (newUrl) => {
    console.log('Hi')
    setUrl(newUrl)
  }

  return (
    <UserContext.Provider value={url}>
      <UserUpdateContext.Provider value={updateUser}>
        {props.children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
