import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
 // Importe o componente Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from './Principal';
import Cadastro from './Cadastro';
import Navigation from './Navigation';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AppNavigaton from './AppNavigation';
const Stack = createStackNavigator();
export default function App() {
  const [currentUser,setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setCurrentUser(user);
      setIsLoading(false);
    });
  },[]);
  if(isLoading){
    return null;
  }
  return (
    <NavigationContainer>
      {currentUser ? <AppNavigaton/> :  <Navigation/>}     
    </NavigationContainer>
  );
}