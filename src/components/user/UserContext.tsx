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
  email: string;
  authToken: string;
}

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  user: { loggedIn: false, email: '', authToken: '' },
  setUser: () => undefined,
});

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    email: '',
    authToken: '',
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REST_API}/refreshToken`
        );
        if (!response.ok) {
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {}
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
