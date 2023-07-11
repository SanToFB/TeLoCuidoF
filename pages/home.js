import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { styles } from '../components/styles'
import  asyncStorage  from '../services/asyncStorage';
import GlobalContext from '../components/global/context';

export default function Home({ navigation, route }) {

    let { dataUsuario, setAuthenticated } = useContext(GlobalContext);

    useEffect(() => {
        debugger
        console.log(dataUsuario.usuario.apellido)
        // showUserInfo()
        return () => {

        }
    }, [])         
    
    function logOut(){
        asyncStorage.clearAll()
        setAuthenticated(false)
    }


    return (
        <View style={personalStyles.container}>
            <View style={{ margin: 20, marginBottom: 20 }}>
                <Text style={styles.text}> Bienvenido: </Text>
                {dataUsuario.usuario.isNanny ?
                    (<Text style={styles.text1}>Niñera {dataUsuario.usuario.nombre} {dataUsuario.usuario.apellido} </Text>) :
                    (<Text style={styles.text1}>Usuario  {dataUsuario.usuario.nombre} {dataUsuario.usuario.apellido}</Text>)}
                <Text style={styles.text1}> {dataUsuario.usuario.mail}</Text>
            </View>
            <View style={[styles.container, { backgroundColor: '#8fbc8f' }]}>
                <View style={{ flexDirection: 'column' }}>
                    {dataUsuario.usuario.isNanny ? (
                        <View style={{ flexDirection: 'row', textAlign: 'center' }}>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text
                                    style={[styles.button2, { backgroundColor: '#1e90ff' }]}
                                    onPress={() => navigation.navigate('Favoritos')}
                                >Favoritos</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', textAlign: 'center' }}>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text
                                    style={[styles.button2, { backgroundColor: '#1e90ff' }]}
                                    onPress={() => navigation.navigate('Search')}
                                >Buscar Nanny</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text
                                    style={[styles.button2, { backgroundColor: '#1e90ff' }]}
                                    onPress={() => navigation.navigate('Favoritos')}
                                >Favoritos</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    < View style={{ flexDirection: 'row', textAlign: 'center' }}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text
                            style={[styles.button2, { backgroundColor: '#b22222' }]}
                            onPress={() => logOut()}
                        >Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text
                            style={[styles.button2, { backgroundColor: '#1e90ff' }]}
                            onPress={() => navigation.navigate('Profile')}
                        >Perfil</Text>
                    </TouchableOpacity>

                </View>
                <Button style={styles.button}
                    onPress={() => navigation.goBack()}
                    title="Volver"
                    color="#ff7f50"
                />

            </View>
        </View>
        </View >
    );
}

const personalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8fbc8f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        elevation: 8,
        minWidth: '40%',
        padding: 5,
        marginTop: 15,
        margin: 8,
        borderRadius: 10,
        paddingVertical: 1,
        paddingHorizontal: 10,
        backgroundColor: '#00ffff' //`#f0f8ff` //aliceblue
    },
});
