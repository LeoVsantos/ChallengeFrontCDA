import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/apiClient';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  nome: string;
  senha: string;
}
interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CDA:userToken');
    const user = localStorage.getItem('@CDA:userData');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ nome, senha }) => {
    const response = await api.post('sessions', {
      nome,
      senha,
    });

    const { token, user } = response.data;

    localStorage.setItem('@CDA:userToken', token);
    localStorage.setItem('@CDA:userData', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CDA:userToken');
    localStorage.removeItem('@CDA:userData');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@CDA:userData', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
export default AuthContext;
