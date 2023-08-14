import React from 'react';
import AppNavigator from './navigation/AppNavigator'; 
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as ProfileProvider } from './context/UserProfileContext';

const App = () => {


  return (
    <AuthProvider>
      <ProfileProvider>
        <AppNavigator />
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
