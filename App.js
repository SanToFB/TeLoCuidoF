import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './pages/home';
import Message from './pages/message';
import Profile from './pages/profile';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Search from './components/search'
import DataProfile from './pages/dataProfile'
import AsyncStorage from './services/asyncStorage';
import FlatListNannies from './components/flatList';
import GlobalContext from './components/global/context';
import Constants from 'expo-constants';

import * as WebBroser from 'expo-web-browser'

WebBroser.maybeCompleteAuthSession();

export default function App() {
  const [dataUsuario, setDataUsuario] = useState({})
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Traigo info usuario logueado")
    AsyncStorage.getData('dataUsuario')
      .then(data => {
        setDataUsuario(data)
      })
      .catch(error => console.log("Error", error))
  }, [])

  const Stack = createNativeStackNavigator();

  return (
    <GlobalContext.Provider value={{ dataUsuario, setDataUsuario, setAuthenticated, dataUsuario }}>
      <NavigationContainer>
        {
          (authenticated) ?
            <Stack.Navigator>
              <Stack.Screen name={'Home'} component={Home} />
              <Stack.Screen name={'Search'} component={Search} options={{ title: "Buscando niñera:" }} />
              <Stack.Screen name={'Profile'} component={Profile} options={{ title: "Bienvenido al Perfil" }} />
              <Stack.Screen name={'DataProfile'} component={DataProfile} options={{ title: "Informacion de Usuario:" }} />
              <Stack.Screen name={'Message'} component={Message} options={{ title: "Envie Mensajes" }} />
              <Stack.Screen name={'FlatListNannies'} component={FlatListNannies} />
            </Stack.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false }} />
              <Stack.Screen name={'SignUp'} component={SignUp} />
            </Stack.Navigator>
        }

      </NavigationContainer >
    </GlobalContext.Provider >
  );

  //Al momento de levantar "productivo" poner en app.json.
  /*    
      "expo": {
          "scheme": "com.nt2.teLoCuido"
        },
  */

}