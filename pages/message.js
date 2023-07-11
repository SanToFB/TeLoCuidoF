import { useState, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import GlobalContext from '../components/global/context';
import FlatListMessages from '../components/FlatListMessages'

export default function Message({ navigation, route }) {
    let { dataUsuario, setDataUsuario } = useContext(GlobalContext);
    const [contact, setContact] = useState(route.params)
    //let contact = route.params;
    if (contact.isNanny == undefined) {
        traerUsuario(contact._id)
    }
    async function traerUsuario(id) {
        //let isUser = dataUsuario.usuario.isNanny ? false : true;
        let URL = 'http://localhost:3000/'
        let api = dataUsuario.usuario.isNanny ? 'users/api/user/' + id : 'nannies/api/nanny/' + id

        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "GET",
            headers: headers,
        }
        let urlApi = URL + api
        try {
            const data = await fetch(urlApi, request).then(resp => resp.json());
            setContact(data);
        } catch (err) {
            console.error(err.message);
        }
    }
    let idNanny;
    let idUser;
    let nombreUs;
    let nombreNa;

    if (contact.isNanny) {
        idNanny = contact._id
        idUser = dataUsuario.usuario._id
        nombreNa = contact.nombre
        nombreUs = dataUsuario.usuario.nombre
    } else {
        idUser = contact._id
        idNanny = dataUsuario.usuario._id
        nombreUs = contact.nombre
        nombreNa = dataUsuario.usuario.nombre
    }
    const [mensajes, setMensajes] = useState([]);
    const [message, setMessage] = useState(" ");
    const [flag, setFlag] = useState(false);

    let nuevoMensaje = {
        message: {
            userId: '',
            nannyId: '',
            sender: '',
            mensaje: ''
        }
    }
    useEffect(() => {
        if (flag) {
            traerMensajes();
            setFlag((prev) => !prev)
        }
        return () => {
            console.log("se ha producido un error: ")
        }
    }, [flag])

    useEffect(() => {
        traerMensajes();
        return () => {
            console.log("se ha producido un error: ")
        }
    }, [idUser, idNanny, contact])

    function agregarNombres(data) {
        let nombres;
        nombres = data.map((e) => {
            e.sender = e.sender === idNanny ? nombreNa : nombreUs;
            // e.date = e.date.substring(0,25);
            return e;
        })
        setMensajes(nombres);
    }

    async function traerMensajes() {
        let URL = 'http://localhost:3000/messages/api/mensajes/';
        URL = URL + idUser + "/" + idNanny
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "GET",
            headers: headers,
        }
        try {
            const data = await fetch(URL, request).then(resp => resp.json());
            agregarNombres(data);
        } catch (err) {
            console.error(err);
        }
    }
    function sendMessage() {
        send();
        setMessage("");
    }
    function cargarMensaje() {
        nuevoMensaje.message.userId = idUser
        nuevoMensaje.message.nannyId = idNanny
        nuevoMensaje.message.sender = dataUsuario.usuario._id
        nuevoMensaje.message.mensaje = message
    }

    async function send() {
        const URL = 'http://localhost:3000/messages/api/enviarMensaje';
        cargarMensaje();

        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(nuevoMensaje),
        }
        try {
            const data = await fetch(URL, request).then(resp => resp.json());
            console.log(JSON.stringify(data));
            cargarFavoritosNanny()
            cargarFavoritosUser()
            setFlag(true)
        } catch (err) {
            console.error(err);
        }
    }


    async function cargarFavoritosNanny() {
        let favoritosURLNanny = 'http://localhost:3000/nannies/api/agregarFavoritos'
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ userId: idNanny, userFavoritosId: idUser }),
        }
        try {
            const data = await fetch(favoritosURLNanny, request).then(resp => resp.json());
            //console.log(JSON.stringify(data));
            if (dataUsuario.usuario.isNanny) {
                dataUsuario.usuario = data;
                setDataUsuario(dataUsuario)
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function cargarFavoritosUser() {
        let favoritosURLUser = 'http://localhost:3000/users/api/agregarFavoritos'
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ userId: idUser, userFavoritosId: idNanny }),
        }
        try {
            const data = await fetch(favoritosURLUser, request).then(resp => resp.json());
            if (!dataUsuario.usuario.isNanny) {
                dataUsuario.usuario = data;
                setDataUsuario(dataUsuario)
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <SafeAreaView style={stylesPersonal.container}>
            <View >
                <Text style={stylesPersonal.title}> Mensajes: </Text>
                <View style={stylesPersonal.containerMsg}>
                    <FlatListMessages mensajes={mensajes} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[stylesPersonal.title, { flexDirection: 'row' }]}> Escribe un mensaje: </Text>
                    <TextInput
                        style={stylesPersonal.input}
                        value={message}
                        placeholder={"Escriba un mensaje"}
                        onChangeText={(text) => setMessage(text)}
                    />
                </View>

                <View>
                    <TouchableOpacity style={stylesPersonal.buttonContainer}>
                        <Text
                            style={stylesPersonal.button}
                            onPress={() => sendMessage()}
                        >        Enviar </Text>
                    </TouchableOpacity>
                    <Button style={stylesPersonal.button}
                        onPress={() => navigation.goBack()}
                        title="Volver"
                        color="#ff7f50"
                    />
                </View>
                <View>
                    <Button 
                        onPress={() => navigation.navigate('Home')}
                        title="Home"
                        color="#008080"
                        style={stylesPersonal.button2}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const stylesPersonal = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'center',
    },
    containerMsg: {
        marginTop: 8,
        padding: 10,
        backgroundColor: "aliceblue", 
    },
    button: {
        elevation: 5,
        minWidth: '35%',
        padding: 5,
        marginTop: 5,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginLeft:5,
        alignContent: 'center',
        backgroundColor: '#6495ed' 
    },
    button2:{
        elevation: 5,
        minWidth: '30%',
        padding: 5,
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 3,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#008080',
        borderRadius:15
    },
    buttonContainer: {
        elevation: 5,
        minWidth: '30%',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
        margin: 5,
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'center',
    },
    input: {
        borderRadius: 3,
        padding: 10,
        paddingTop: 3,
        marginTop: 5,
        backgroundColor: `#7fffd4`, // aquamarine 
        color: `#000000`, //black
        paddingVertical: 6,
    },
    title: {
        fontSize: 16,
        margin: 5,
        padding: 10,
        paddingTop: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

/*
*   csantana@gmail.com
*   abg-127
*/


