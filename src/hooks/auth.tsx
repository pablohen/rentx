import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import database from '../database';
import api from './../services/api';
import { User as ModelUser } from '../database/model/User';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const res = await api.post('/sessions', {
        email,
        password,
      });
      const { token, user } = res.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({
        ...user,
        token,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData: any) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<ModelUser>('users');
      const res = await userCollection.query().fetch();

      if (res.length > 0) {
        const userData = res[0]._raw as unknown as User;

        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
        setLoading(false);
      }
    };

    loadUserData();
  });

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
