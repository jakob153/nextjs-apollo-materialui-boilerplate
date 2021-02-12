import React, {
  FC,
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
