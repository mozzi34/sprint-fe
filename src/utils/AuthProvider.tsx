import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  postUserLogInApi,
  fetchUserInfoApi,
  deleteUserLogOutApi,
  editUserInfoApi,
} from '../utils/api/userApi';
import { useRouter } from 'next/router';
import React from 'react';

export interface LoginValue {
  email: string;
  encryptedPassword: string;
}

interface UserValue {
  id: string;
  email: string;
  nickname: string;
}

interface Values {
  user: UserValue | null;
  isPending: boolean;
}

interface AuthContextType {
  user: UserValue | null;
  isPending: boolean;
  login: (loginData: LoginValue) => Promise<void>;
  editInfo: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const [values, setValues] = useState<Values>({ user: null, isPending: true });

  const getMe = async () => {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    try {
      const res = await fetchUserInfoApi();
      setValues((prevValues) => ({
        ...prevValues,
        user: res, // 사용자 정보를 상태로 설정
        isPending: false,
      }));
    } catch (error) {
      setValues((prevValues) => ({
        ...prevValues,
        isPending: false,
      }));
      console.error('Error fetching user info:', error);
    }
  };

  const login = async ({ email, encryptedPassword }: LoginValue) => {
    const resData = await postUserLogInApi({
      email,
      encryptedPassword,
    });
    await getMe(); // 사용자 정보 업데이트

    return resData; // 응답 데이터 반환
  };

  const logout = async () => {
    const res = await deleteUserLogOutApi();
  };

  const editInfo = async () => {
    const res = await editUserInfoApi();
    // setValues((prevValues) => ({
    //   ...prevValues,
    //   user: res,
    //   isPending: false,
    // }));
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      getMe();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        editInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean) {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다!');
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push('/login');
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
