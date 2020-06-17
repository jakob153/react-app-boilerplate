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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);

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

      setLoading(false);
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
