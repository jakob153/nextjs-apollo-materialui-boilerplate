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

const authTokenRefreshIntervalInMinutes = 60;

export const UserContext = createContext<UserContext | undefined>(undefined);

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
        const response = await fetch(`http://localhost:8000/refreshToken`, {
          credentials: 'include',
        });

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

  useEffect(() => {
    const accessTokenInterval = async () => {
      try {
        const response = await fetch(`http://localhost:8000/refreshToken`, {
          credentials: 'include',
        });

        const userData = (await response.json()) as User;

        setUser((prevState) => ({
          ...prevState,
          authToken: userData.authToken,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const acTokenIntervalId = setInterval(
      () => accessTokenInterval(),
      60 * authTokenRefreshIntervalInMinutes * 1000
    );

    if (!user.loggedIn) {
      clearInterval(acTokenIntervalId);
    }

    return () => {
      clearInterval(acTokenIntervalId);
    };
  }, [user.loggedIn]);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
