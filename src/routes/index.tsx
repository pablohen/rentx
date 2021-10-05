import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import AppTabRoutes from './app.tab.routes';
import AuthRoutes from './auth.routes';
import LoadAnimated from '../components/LoadAnimated';

const Routes = () => {
  const { user, loading } = useAuth();

  return loading ? (
    <LoadAnimated />
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
