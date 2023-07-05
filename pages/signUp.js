import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, TextInput, } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import * as WebBroser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import /*{dataUsuario, DataContext}*/GlobalContext from '../components/global/context';

export default function SignUp() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [isNanny, setIsNanny] = useState(false);
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [dni, setDni] = useState('');
    const [turno, setTurno] = useState([]);
    const [dias, setDias] = useState([]);
    const [mail, setMail] = useState('');
    const [cuidaMascotas, setCuidaMascotas] = useState(false);
    // const [favoritos, setFavoritos] = useState('');
    const [password, setPassword] = useState('');

    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(false);




    const URL = 'http://localhost:3000/nannies/api/'
    let api = '';
    let user = {
        user: {
            isNanny: false,
            nombre: '',
            apellido: '',
            fecha_nacimiento: '',
            dni: '',
            ciudad: '',
            dias: [],
            turno: [],
            mail: '',
            password: '',
            favoritos: [],
            cuidaMascotas: false,
        }
    };

    function cargarUsuario() {
        user.user.isNanny = isNanny;
        user.user.nombre = nombre;
        user.user.apellido = apellido;
        user.user.fecha_nacimiento = fechaNacimiento;
        user.user.dni = dni;
        user.user.ciudad = ciudad;
        user.user.dias.push(dias);
        user.user.turno.push(turno);
        user.user.mail = mail;
        user.user.password = password;
        user.user.favoritos = [];
        if (isNanny) {
            user.user.cuidaMascotas = cuidaMascotas;
        }
    }

    async function registrarse() {
        api = isNanny ? 'nanny' : 'user';
        cargarUsuario();
        debugger
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user),
        }
        let urlApi = URL + api;
        try {
            const datas = await fetch(urlApi, request).then(resp => resp.json());
            console.log(JSON.stringify(datas));

        } catch (err) {
            console.error(err);
        }

        //navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <SafeAreaView >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: "row", marginLeft: 3, justifyContent: "space-between" }}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text
                                style={selected1 ? styles.selected : styles.button}
                                onPress={() => {
                                    setSelected1(prev => !prev)
                                    setIsNanny(prev => !prev)
                                    setSelected2(false)
                                }}
                            >Niñera</Text>
                        </TouchableOpacity>
                    </View>
                    {(isNanny === true) ? (
                        <View>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text
                                    style={selected2 ? styles.selected : styles.button}
                                    onPress={() => {
                                        setSelected2(prev => !prev)
                                        setCuidaMascotas(prev => !prev)
                                    }}
                                >Cuida Mascotas</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                        </View>)}

                </View>

                <TextInput
                    style={styles.input}
                    value={nombre}
                    placeholder={"Nombre"}
                    onChangeText={(text) => setNombre(text)}
                />
                <TextInput
                    style={styles.input}
                    value={apellido}
                    placeholder={"Apellido"}
                    onChangeText={(text) => setApellido(text)}
                />
                <TextInput
                    style={styles.input}
                    value={dni}
                    placeholder={"Dni nn.nnn.nnn"}
                    onChangeText={(text) => setDni(text)}
                />
                <TextInput
                    style={styles.input}
                    value={fechaNacimiento}
                    placeholder={"FechaNacimiento dd/mm/aaaa"}
                    onChangeText={(text) => setFechaNacimiento(text)}
                />
                <TextInput
                    style={styles.input}
                    value={ciudad}
                    placeholder={"Ciudad"}
                    onChangeText={(text) => setCiudad(text)}
                />
                <TextInput
                    style={styles.input}
                    value={turno}
                    placeholder={"mañana - tarde - noche"}
                    onChangeText={(text) => setTurno(text)}
                />
                <TextInput
                    style={styles.input}
                    value={dias}
                    placeholder={"lunes - martes - miercoles - jueves - viernes"}
                    onChangeText={(text) => setDias(text)}
                />
                <TextInput
                    style={styles.input}
                    value={mail}
                    placeholder={"Mail"}
                    onChangeText={(text) => setMail(text)}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder={"Password"}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text
                        style={styles.button2}
                        onPress={() =>
                            registrarse()
                        }
                    >Registrarse</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 10,
        minWidth: '20'
    },
    container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'aliceblue',
        flexDirection: 'column'
    },
    buttonContainer: {
        elevation: 8,
        minWidth: '30%',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 3
    },
    button: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 15,
        marginLeft: 10,
        backgroundColor: `#87cefa`, //lightskyblue 
        color: 'black',
        minWidth: '80%',
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
    button2: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: `#daa520`, //darkslategrey  
        color: 'black',
        alignSelf: 'flex-start',
        minWidth: '20%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
})
/*
 * Falta mejor pasar array turno y dias, pasar varios.              
*/