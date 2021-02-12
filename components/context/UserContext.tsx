import React, {
  FC,
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useQuery } from '@apollo/client';

import { CHECK_SESSION } from './CheckSession.query';

interface User {
  loggedIn: boolean;
  username: string;
  email: string;
}

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContext | undefined>(undefined);

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
    email: '',
  });

  const { data } = useQuery<Omit<User, 'loggedIn'>, null>(CHECK_SESSION);

  useEffect(() => {
    if (data) {
      setUser({
        loggedIn: true,
        username: data.username,
        email: data.email,
      });
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
