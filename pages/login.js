import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import * as WebBroser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import /*{dataUsuario, DataContext}*/GlobalContext from '../components/global/context';

WebBroser.maybeCompleteAuthSession();


export default function Login() {

    let { dataUsuario, setAuthenticated } = useContext(GlobalContext);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState();
    

    async function loginUser() {
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ mail: mail, password })
        }
        try {
            const data = await fetch('http://localhost:3000/nannies/api/login', request).then(resp => resp.json());
            debugger
            changeContext(data);
            GlobalContext.authenticated = true;
            setUserInfo(data)
            //applyAuthentication(data);

        } catch (err) {
            console.error(err.message);
        }
    }

    function changeContext(data){
        GlobalContext.token = data.token;
        GlobalContext.apellido = data.usuario.apellido;
        GlobalContext.ciudad = data.usuario.ciudad;
        GlobalContext._id = data.usuario._id;
        GlobalContext.isNanny = data.usuario.isNanny;
        GlobalContext.nombre = data.usuario.nombre;
        GlobalContext.fecha_nacimiento = data.usuario.fecha_nacimiento;
        GlobalContext.turno = data.usuario.turno;
        GlobalContext.dni = data.usuario.dni;
        GlobalContext.mail = data.usuario.mail;
        GlobalContext.dias = data.usuario.dias;
        GlobalContext.favoritos = data.usuario.favoritos;
        GlobalContext.cuidaMascotas = data.usuario.cuidaMascotas;
    }

    useEffect(() => {
        if (token != null) {
            setToken(token);
        }
    }, [token]);


    //expo auth google / https://docs.expo.dev/guides/google-authentication/
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '1058463615133-sid329rj5gdmsoagha5ced30bhb9va75.apps.googleusercontent.com',
        iosClientId: '1058463615133-gh5cjhhmt5jol4u0lmql63eo59pr8t50.apps.googleusercontent.com',
        androidClientId: '1058463615133-9d2faab499ouvcl9dfhj1qmolnos7cjf.apps.googleusercontent.com'
    })

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
        }
    }, [response]);

    const getUserData = async () => {
        try {
            let responseData = await fetch("https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token} ` },
                }
            );
            responseData.json().then(data => {
                debugger;
                setUserInfo(data)
            })
        } catch (error) {
            //agregar algun manejo de error
            console.log(error);
        }
    }

    function showUserInfoBack(){
        debugger
        if (GlobalContext.authenticated){
            return (
                <View style={styles.container}>
                    <Text style={styles.text}> Bienvenido:  </Text>
                    {userInfo.usuario.isNanny ? 
                    (<Text style={styles.text1}>Niñera {userInfo.usuario.nombre} {userInfo.usuario.apellido} </Text>) :
                    (<Text style={styles.text1}>Usuario  {userInfo.usuario.nombre} {userInfo.usuario.apellido}</Text>)}
                    <Text style={styles.text1}> {userInfo.usuario.mail}</Text>
                </View>
            );
        }
    }


    function showUserInfo() {
        if (userInfo) {
            return (
                <View style={styles.container}>
                    <Image source={{ uri: userInfo.picture }} style={styles.logoImage} />
                    <Text> Bienvenido:  {userInfo.name}</Text>
                    <Text> {userInfo.email}</Text>
                </View>
            );
        }
    }

    /*const {setAuthenticated} = useContext(GlobalContext);
    
    const login = () => {
        setAuthenticated(true);
    }
    */
    return (

        <View style={styles.container}>
            {showUserInfo()}
            {showUserInfoBack()}
            <Text style={styles.text}>Login page!   </Text>
            {userInfo === null ? ([
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={token ? getUserData() : () => { promptAsync() }}
                />,
                <View style={styles.container}> 
                    <TextInput style={styles.input}
                        placeholder='Ingrese Mail'
                        value={mail}
                        keyboardType='email-address'
                        onChangeText={(text) => setMail(text)}
                    />
                    <TextInput style={styles.input}
                        placeholder='Ingrese Password'
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={loginUser}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            ]) : (
                <Text style={styles.container}> {userInfo.name} </Text>
            )}
        

        </View>


    );
}

const styles = StyleSheet.create({
    container: {   // flexDirection: row
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text1: {
        fontSize: 16,
        color: `#000000` //black
    },
    input:{
        borderRadius: 3,
        padding:10,
        backgroundColor:`#5f9ea0`, //cadetblue  
        color: `#000000`, //black
        paddingVertical: 6,
    },
    logoImage: {
        width: 80,
        height: 80,
    },
    button: {
        borderRadius:5,
        paddingVertical:15,
        paddingHorizontal:70,
        backgroundColor:`#f0f8ff` //aliceblue
    },
    buttonText:{
        fontSize: 16,
        fontStyle: 'italic',
        color: `#000000` //black
    }

})

/*
const clienteAndroidExpo = '1058463615133-9d2faab499ouvcl9dfhj1qmolnos7cjf.apps.googleusercontent.com';
const clienteAndroid = '1058463615133-b993p61uojeuc3p4q4o2594omd5j2g4h.apps.googleusercontent.com'
const clienteIos = '1058463615133-bqetdft4e37gq4aj7o2q2jbjrfl0jchs.apps.googleusercontent.com'
const clienteIosExpo = '1058463615133-gh5cjhhmt5jol4u0lmql63eo59pr8t50.apps.googleusercontent.com'
const webClient = '1058463615133-sid329rj5gdmsoagha5ced30bhb9va75.apps.googleusercontent.com'
const webSecret = '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'
*/