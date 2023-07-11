import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import * as WebBroser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import GlobalContext from '../components/global/context';

WebBroser.maybeCompleteAuthSession();

export default function Login({navigation}) {

    let { dataUsuario, setDataUsuario, setAuthenticated } = useContext(GlobalContext);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState();
    const [selected, setSelected] = useState(false);
    const [esNanny, setEsNanny] = useState(false);
    const [text, setText] = useState("Es niñera?");


    async function loginUser() {
        let URL = 'http://localhost:3000/'
        let api = esNanny ? 'nannies/api/login' : 'users/api/login'
        URL = URL + api;
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ mail: mail, password: password })
        }
        console.log(request.body)
        try {
            const data = await fetch(URL, request).then(resp => resp.json());
            //changeContext(data);
            setAuthenticated(true);
            setDataUsuario(data)
            //setUserInfo(data)
            //applyAuthentication(data);
        } catch (err) {
            console.error(err.message);
        }
    }



    /*function changeContext(data) {
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
    }*/

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
            debugger
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
                setUserInfo(data)
            })
        } catch (error) {
            //agregar algun manejo de error
            console.log(error);
        }
    }

    function showUserInfo() {
        if (userInfo) {
            return (
                <View style={styles.container}>
                    <Image source={{ uri: userInfo.picture }} style={styles.picture} />
                    <Text> Bienvenido:  {userInfo.name}</Text>
                    <Text> {userInfo.email}</Text>
                </View>
            );
        }
    }

    function cambiarText(text) {
        if (text == 'Es niñera?' || text == 'Usuario') {
            setText('Niñera')
        } else {
            setText('Usuario')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.signContainer}>
                <Text
                    style={styles.buttonSign}
                    onPress={() => {navigation.navigate('SignUp')}}
                >SignUp</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Login or:</Text>
                <View style={styles.containerGoogle}>
                    <Button
                        title="Sign in with Google"
                        disabled={!request}
                        onPress={token ? getUserData() : () => { promptAsync() }}
                    />
                </View>
            </View>
            {userInfo === null ? (
                <View>

                    <View style={styles.container}>
                        <Text style={styles.text1}> Ingrese con Mail y Password: </Text>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text
                                style={selected ? styles.selected : styles.button2}
                                onPress={() => {
                                    setSelected(prev => !prev)
                                    setEsNanny(prev => !prev)
                                    cambiarText(text)
                                }}
                            >{text}</Text>
                        </TouchableOpacity>
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
                </View>
            ) : (
                <View>
                    {showUserInfo()}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {   // flexDirection: row
        flex: 1,
        marginTop: 25,
        backgroundColor: '#e0ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerGoogle: {
        flex: 1,
        marginLeft: 15,
        backgroundColor: '#e0ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text1: {
        fontSize: 16,
        margin: 15,
        color: `#000000` //black
    },
    input: {
        borderRadius: 3,
        padding: 10,
        paddingTop: 3,
        marginTop: 5,
        backgroundColor: `#5f9ea0`, //cadetblue  
        color: `#000000`, //black
        paddingVertical: 6,
    },
    picture: {
        width: 80,
        height: 80,
    },
    button: {
        elevation: 8,
        minWidth: '40%',
        padding: 5,
        marginTop: 15,
        borderRadius: 10,
        paddingVertical: 1,
        paddingHorizontal: 10,
        backgroundColor: '#00ffff' //`#f0f8ff` //aliceblue
    },
    buttonText: {
        fontSize: 16,
        padding: 5,
        fontStyle: 'italic',
        color: `#000000`, //black
        minWidth: '40%',
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: '#00ffff'
    },
    buttonContainer: {
        elevation: 8,
        minWidth: '40%',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 3
    },
    button2: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 15,
        padding:5,
        marginLeft: 10,
        backgroundColor: `#87cefa`, //lightskyblue 
        color: 'black',
        minWidth: '30%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
    selected: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 15,
        marginLeft: 10,
        backgroundColor: `#66cdaa`,
        color: `black`, //navy
        minWidth: '50%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
    signContainer:{
        minWidth: '20%',
        borderRadius: 5,
        padding: 3,
        marginBottom:155,
        backgroundColor:'#e0ffff'
    },
    buttonSign: {
        fontSize: 16,
        padding: 5,
        fontStyle: 'italic',
        color: `#000000`, //black
        minWidth: '30%',
        textAlign: 'center',
        backgroundColor: '#00ffff'
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