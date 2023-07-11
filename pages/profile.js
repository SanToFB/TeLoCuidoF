import { StyleSheet, TextInput, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../components/global/context';
import FlatListNannies from '../components/flatList';

const page = 'Profile'
export default function Profile({ navigation }) {
    const [selected, setSelected] = useState(false);
    const { dataUsuario } = useContext(GlobalContext);
    const [isEditar, setIsEditar] = useState(false)

    let userType = (dataUsuario.usuario.isNanny) ? "Niñera" : "Usuario";
    const cuidaMasco = dataUsuario.usuario.cuidaMascotas;
    if (cuidaMasco) {
        setSelected(true)
    }

    // let userTurnos = dataUsuario.usuario.turno.join(); para concat array si hay.
    const [ciudad, setCiudad] = useState(dataUsuario.usuario.ciudad);
    const [turno, setTurno] = useState(dataUsuario.usuario.turno);
    const [dias, setDias] = useState(dataUsuario.usuario.dias);
    const [mail, setMail] = useState(dataUsuario.usuario.mail);
    const [favoritos, setFavoritos] = useState(dataUsuario.usuario.favoritos);
    const [cuidaMascotas, setCuidaMascotas] = useState(dataUsuario.usuario.cuidaMascotas);
    const [password, setPassword] = useState(dataUsuario.usuario.password);
    //falta password y favoritos
    function pasarArray(aSplitear) {
        return aSplitear.Split(",");
    }
    const URL = 'http://localhost:3000/';

    async function editar() {
        api = dataUsuario.usuario.isNanny ? 'nannies/api/nanny/' : 'users/api/user/';
        api + dataUsuario.usuario._id
        cargarUsuario();
        debugger
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        let request = {
            method: "PUT",
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
    }

    function cargarUsuario() {
        user.user.isNanny = dataUsuario.usuario.isNanny;
        user.user.nombre = dataUsuario.usuario.nombre;
        user.user.apellido = dataUsuario.usuario.apellido;
        user.user.fecha_nacimiento = dataUsuario.usuario.fechaNacimiento;
        user.user.dni = dataUsuario.usuario.dni;
        user.user.ciudad = ciudad;
        user.user.dias = dias;
        user.user.turno = turno;
        user.user.mail = mail;
        user.user.password = password;
        user.user.favoritos = dataUsuario.usuario.favoritos; //Fav => Se agrega desde mensajes cuando ves tus converzaciones
        if (dataUsuario.usuario.isNanny) {                  //Fav => Se eliminan desde la lista (FLATLIST => Hacer item2)
            user.user.cuidaMascotas = cuidaMascotas; //para mostrar la info de favo y para poder eliminar. 
        }           //capaz puedo meter {item, onPress} y desde profile pasar eliminar y desde search navegar.
    }


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.info, {fontSize:16, fontWeight:'bold'}]}>{userType}</Text>
                {(userType === "Niñera") ? (
                    <View>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text
                                style={selected ? styles.selected : styles.button}
                                onPress={() => {
                                    setSelected(prev => !prev)
                                    setCuidaMascotas(prev => !prev)
                                }}
                            >Cuida Mascotas</Text>
                        </TouchableOpacity>
                    </View>) : (<View> </View>)
                }
            </View>
            <Text style={styles.info}>Nombre: {dataUsuario.usuario.nombre} {dataUsuario.usuario.apellido}</Text>
            <Text style={styles.info}>DNI: {dataUsuario.usuario.dni}</Text>
            <Text style={styles.info}>Fecha de Nacimiento: {dataUsuario.usuario.fecha_nacimiento}</Text>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={styles.info}> Ciudad: </Text>
                <TextInput
                    style={styles.input}
                    value={ciudad}
                    placeholder={"Ciudad"}
                    onChangeText={(text) => {
                        setCiudad(text)
                        setIsEditar(true)
                    }}
                />
            </View>
            <View>
                <Text style={{fontSize:14, padding:8 }}>Al agregar mas de un turno / dias separar por ","</Text>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={styles.info}> Turno: </Text>
                <TextInput
                    style={styles.input}
                    value={turno}
                    placeholder={"Turnos"}
                    onChangeText={(text) => {
                        setTurno(text)
                        setIsEditar(true)
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={styles.info}> Dias: </Text>
                <TextInput
                    style={styles.input}
                    value={dias}
                    placeholder={"Dias"}
                    onChangeText={(text) => {
                        setDias(text)
                        setIsEditar(true)
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={styles.info}> Mail: </Text>
                <TextInput
                    style={styles.input}
                    value={mail}
                    placeholder={"Mail"}
                    onChangeText={(text) => {
                        setMail(text)
                        setIsEditar(true)
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.info}> Pass: </Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder={"Pass"}
                    onChangeText={(text) => {
                        setPassword(text)
                        setIsEditar(true)
                    }}
                />
            </View>
            {favoritos ? (
                <View>
                    <FlatListNannies nannies={favoritos} navigation={navigation} page={page} />
                </View>
            ) : (
                <View> </View>
            )}

            <View style={styles.buttonContainer}>
                {isEditar === true ? (
                    <View>
                        <Button style={styles.button}
                            onPress={editar()}
                            title="Editar"
                            color="#5f9ea0"
                        />
                    </View>
                ) : <View></View>}
                <Button style={styles.button}
                    onPress={() => navigation.goBack()}
                    title="Volver"
                    color="#ff7f50"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        fontStyle: "italic",
        fontSize: 14,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginTop: 8,
        minWidth: '20'
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
});


/*
*   csantana@gmail.com
*   abg-127
*/