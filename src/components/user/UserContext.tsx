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
  user: {
    loggedIn: false,
    username: '',
    email: '',
    authToken: '',
  },
  setUser: () => undefined,
});

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
    email: '',
    authToken: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(`${process.env.REACT_APP_API}/refreshToken`);
        const response = await fetch(
          `${process.env.REACT_APP_API}/refreshToken`,
          { credentials: 'include' }
        );

        if (!response.ok) {
          setLoading(false);
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

      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
