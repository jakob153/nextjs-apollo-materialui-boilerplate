import React, { FC, createContext, useState, Dispatch, SetStateAction } from 'react';

interface User {
  loggedIn: boolean;
  email: string;
}

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  user: { loggedIn: false, email: '' },
  setUser: () => undefined,
});

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: false, email: '' });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
