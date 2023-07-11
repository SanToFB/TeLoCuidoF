import { useState, useContext, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, FlatList } from "react-native";
import GlobalContext from '../components/global/context';
import FlatListMessages from '../components/FlatListMessages'
import { styles } from '../components/styles'

/*
*Me traigo todos los mensajes de ahi saco cada nombre y apellido y al tocar uno vamos al chat con ese.
*/
 
/*const dataUsuario.usuario = {
    "_id": "63fcbf2cdce5b6f4aea9d929",
    "isNanny": false,
    "nombre": "Jimi",
    "apellido": "Hendrix",
    "fecha_nacimiento": "19-07-1943",
    "ciudad": "Belgrano",
    "dni": "41.525.874",
    "turno": [
        "tarde",
        "noche"
    ],
    "dias": [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes"
    ],
    "favoritos": [],
    "mail": "jhendrix@gmail.com",
    "password": "$2a$08$hgn.HJ4/GsneYxMEfIzRbOm.7KPxUzZzcglYmcN48wjuK7RihnXxm"
}*/

/*const contact = {
    "_id": "63fcbf49dce5b6f4aea9d92e",
    "isNanny": true,
    "nombre": "Camila",
    "apellido": "Gutiérrez",
    "fecha_nacimiento": "19 / 01 / 1999",
    "ciudad": "Belgrano",
    "dni": "41.525.874",
    "turno": [
        "mañana"
    ],
    "dias": [
        "lunes",
        "martes",
        "sabado",
        "domingo"
    ],
    "mail": "camiG@gmail.com",
    "cuidaMascotas": true,
    "favoritos": [],
    "password": "$2a$08$SYpr251WHsu9jNh371tZMOnFo4TWFa53TBoP/fsnpO/WxL.A5tfdu"
}*/





export default function Message({ navigation, route }) {
    const { dataUsuario} = useContext(GlobalContext);

    let contact = route.params;
let idNanny;
let idUser;
let nombreUs;
let nombreNa;

if (contact.isNanny) {
    debugger
    idNanny = contact._id
    idUser = dataUsuario.usuario._id
    nombreNa = contact.nombre
    nombreUs = dataUsuario.usuario.nombre
    //setIdNanny(contact._id);
    // setIdUser(dataUsuario.usuario._id);
    // setNombreUs(dataUsuario.usuario.nombre);
    // setNombreNa(contact.nombre);
} else {
    debugger
    idUser = contact._id
    idNanny = dataUsuario.usuario._id
    nombreUs = contact.nombre
    nombreNa = dataUsuario.usuario.nombre
    //setIdUser(contact._id);
    //setIdNanny(dataUsuario.usuario._id);
    //setNombreUs(contact.nombre);
    //setNombreNa(dataUsuario.usuario.nombre);
}

    //const [nombreUs, setNombreUs] = useState(cargarIdsYNombres());
    //const [nombreNa, setNombreNa] = useState(cargarIdsYNombres());
    //const [idNanny, setIdNanny] = useState('');
    //const [idUser, setIdUser] = useState(cargarIdsYNombres());
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
        debugger
        if(flag){
            traerMensajes();
            setFlag((prev) => !prev)
        }
        return () => {
            console.log("se ha producido un error: ")
        }
    }, [flag])

    useEffect(() => {
        debugger
        traerMensajes();
        return () => {
            console.log("se ha producido un error: ")
        }
    }, [idUser, idNanny])

    /*
      function cargarIdsYNombres() {
          //let contact = route.params;
          
          if (contact.isNanny) {
              //idNanny = contact._id
              idUser = dataUsuario.usuario._id
              nombreNa = contact.nombre
              nombreUs = dataUsuario.usuario.nombre
              setIdNanny(contact._id);
             // setIdUser(dataUsuario.usuario._id);
             // setNombreUs(dataUsuario.usuario.nombre);
             // setNombreNa(contact.nombre);
          } else {
              idUser = contact._id
              //idNanny  = dataUsuario.usuario._id
              nombreUs = contact.nombre
               nombreNa  = dataUsuario.usuario.nombre
              //setIdUser(contact._id);
              setIdNanny(dataUsuario.usuario._id);
              //setNombreUs(contact.nombre);
              //setNombreNa(dataUsuario.usuario.nombre);
          }
      }*/

    function agregarNombres(data) {
        debugger
        let nombres;
        nombres = data.map((e) => {
            e.sender = e.sender === idNanny ? nombreNa : nombreUs;
           // e.date = e.date.substring(0,25);
            return e;
        })
        console.log(nombres)
        setMensajes(nombres);
    }

    async function traerMensajes() {
        let URL = 'http://localhost:3000/messages/api/mensajes/';
        //cargarIdsYNombres();
        debugger
        URL = URL + idUser + "/" + idNanny
        //URL = URL + "63fcbf2cdce5b6f4aea9d929" +"/" + "63fcbf49dce5b6f4aea9d92e"
        //body.userId = "63fcbf2cdce5b6f4aea9d929";
        //body.nannyId = "63fcbf49dce5b6f4aea9d92e";
        //"http://localhost:3000/messages/api/mensajes/63fd336be2d5e6bdc3a19da0/63fcbf49dce5b6f4aea9d92e"

        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "GET",
            headers: headers,
        }
        try {
            const data = await fetch(URL, request).then(resp => resp.json());
            //console.log(JSON.stringify(data));
            agregarNombres(data);

        } catch (err) {
            console.error(err);
        }
    }
    const sendMessage = () => {
        send();
        setMessage("");
    }
    function cargarMensaje() {
        debugger
        nuevoMensaje.message.userId = idUser
        nuevoMensaje.message.nannyId = idNanny
        nuevoMensaje.message.sender = dataUsuario.usuario._id
        nuevoMensaje.message.mensaje = message
    }

    async function send() {
        const URL = 'http://localhost:3000/messages/api/enviarMensaje';
        cargarMensaje();
        //debugger

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
            setFlag(true)
            debugger
        } catch (err) {
            console.error(err);
        }
    }

    /*
    Mensaje trae: 
    
    "_id": "63fcd0e2c16c552f0cd1a9b0",
            "userId": "63fcbf2cdce5b6f4aea9d929",
            "nannyId": "63fcbf49dce5b6f4aea9d92e",
            "sender": "63fcbf2cdce5b6f4aea9d929",
            "mensaje": "hola Camila",
            "date": "Mon Feb 27 2023 12:48:50 GMT-0300 (hora estándar de Argentina)"
    */


    return (
        <SafeAreaView>
            <View style={[styles.container, {flex:1}]}>
                <Text style={styles.title}> Mensajes: </Text>
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
                        >Enviar</Text>
                    </TouchableOpacity>
                    <Button style={stylesPersonal.button}
                    onPress={() => navigation.goBack()}
                    title="Volver"
                    color="#ff7f50"
                />

                </View>
            </View>
        </SafeAreaView>
    );

}

const stylesPersonal = StyleSheet.create({
    containerMsg: {
        marginTop: 8,
        padding: 10,
        backgroundColor: "aliceblue", //aliceblue , beige
    },
    button: {
        elevation: 8,
        minWidth: '30%',
        padding: 5,
        marginTop: 5,
        borderRadius: 10,
        paddingVertical: 1,
        paddingHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6495ed' //cornflowerblue 
    },
    buttonContainer: {
        elevation: 8,
        minWidth: '30%',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 3,
        margin:5,
        alignItems: 'center',
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
    title:{
        fontSize: 16,
        margin: 5,
        padding: 10,
        paddingTop: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})




