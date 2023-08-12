import React from 'react';
import AppNavigator from './navigation/AppNavigator'; 
import { Provider as AuthProvider } from './context/AuthContext';


const App = () => {


  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
