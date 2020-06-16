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
  authToken: string;
}

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  user: { loggedIn: false, username: '', email: '', authToken: '' },
  setUser: () => undefined,
});

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
    email: '',
    authToken: '',
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REST_API}/refreshToken`,
          { credentials: 'include' }
        );
        if (!response.ok) {
          return;
        }

        const userData = (await response.json()) as User;
        setUser({
          username: userData.username,
          email: userData.email,
          authToken: userData.authToken,
          loggedIn: true,
        });
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
