import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/home';
import Message from './pages/message';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Search from './components/search'
import AsyncStorage from './services/asyncStorage';
import FlatListNannies from './components/flatList';
import GlobalContext, { dataUsuario } from './components/global/context';
import Constants from 'expo-constants';

//expo auth google / https://docs.expo.dev/guides/google-authentication/
import * as WebBroser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

WebBroser.maybeCompleteAuthSession();


export default function App() {
debugger
  const [userAuth, setUserAuth] = useState(dataUsuario)

  useEffect(() => {
    console.log("Busca dataUsuario....")
    debugger
    AsyncStorage.getData('dataUsuario')
      .then(data => setUserAuth(data))
      .catch(error => console.log("Error", error))
      .finally(() => console.log("Si busco data"))
  }, [])


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }


  const storeData2 = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }








  //expo auth google / https://docs.expo.dev/guides/google-authentication/
  const [userInfo, setUserInfo] = useState(null);

  const [token, setToken] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '1058463615133-sid329rj5gdmsoagha5ced30bhb9va75.apps.googleusercontent.com',
    iosClientId: '1058463615133-gh5cjhhmt5jol4u0lmql63eo59pr8t50.apps.googleusercontent.com',
    androidClientId: '1058463615133-9d2faab499ouvcl9dfhj1qmolnos7cjf.apps.googleusercontent.com'
  })

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.JSON;
      setUserInfo(user);
    } catch (error) {
      //agregar algun manejo de error
      console.log(error);
    }
  };



  //clases
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  /* 

  const [dataUsuario, setdataUsuario] = useState({
    nombre: "Nana",
    apellido: "Fine",
    mail: "lananafine@hotmail.com",
    cambioNombre: (nombre) => {
      setdataUsuario({ ...dataUsuario, nombre });
    }
  });


  */

  const [authenticated, setAuthenticated] = useState(false);
  return (
    /*
    
    */
    <GlobalContext.Provider value={{
      userAuth,
      setUserAuth
    }}>



      <NavigationContainer>
        {
          (userAuth) ?
            <Tab.Navigator>
              <Stack.Screen name={'SignUp'} component={SignUp}/>
              <Stack.Screen name={'Search'} component={Search} options={
                {
                  // headerShown: false,
                  headerBackVisible: false,
                  title: "Buscando niñera:"
                }
              } />
              <Stack.Screen name={'About'} component={About} />
            </Tab.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name={'Search'} component={Search}/>
              <Stack.Screen name={'SignUp'} component={SignUp}/>
              <Stack.Screen name={'Home'} component={Home}/>
              <Stack.Screen name={'FlatListNannies'} component={FlatListNannies}/>
              <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        }

      </NavigationContainer >
    </GlobalContext.Provider >

    /*
           <Stack.Navigator>
              {
                (authenticated) ?
                  <>
                    <Stack.Screen name={'Home'} component={Home} />
                    <Stack.Screen name={'About'} component={About} />
                  </>
                  :
                  <Stack.Screen name={'Login'} component={Login} />
              }
            </Stack.Navigator>
    
    */




    //Ejemplo con api context
    //   <GlobalContext.Provider value={{dataUsuario, authenticated, setAuthenticated }}>
    //     <NavigationContainer>
    //       <Stack.Navigator>
    //         {
    //           (authenticated)?
    //           <>
    //           <Stack.Screen name={'Home'} component={Home} />
    //           <Stack.Screen name={'About'} component={About} />
    //           </>
    //           :
    //           <Stack.Screen name={'Login'} component={Login} />
    //         }
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </GlobalContext.Provider>
  );


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },

  });

  //Al momento de levantar "productivo" poner en app.json.
  /*    
      "expo": {
          "scheme": "com.nt2.teLoCuido"
        },
  */

}