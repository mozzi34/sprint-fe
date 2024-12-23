import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserInfoApi } from '../utils/api/userApi';

interface User {
  id: string;
  nickname: string;
}

interface UserInfo {
  user: User | null;
  isPending: boolean;
}

const UserContext = createContext<UserInfo>({
  user: null,
  isPending: true,
});

export const UserContextProvider = ({ children }: any) => {
  const [values, setValues] = useState({ user: null, isPending: true });

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        const userInfo = await fetchUserInfoApi();
        setValues((prevValues) => ({
          ...prevValues,
          user: userInfo,
          isPending: false,
        }));
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          isPending: false,
        }));
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{ user: values.user, isPending: values.isPending }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserContext);

  return context;
};
