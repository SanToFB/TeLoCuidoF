import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Card, Icon } from '@rneui/themed';

import GlobalContext from '../components/global/context';
import { TextInput } from 'react-native-web';

export default function Home({ navigation, route }) {

    const params = route.params || {};

    const [nannies, setNannies] = useState([])

    const nannies2 = [
        {
            nombre: "Nana",
            apellido: "Fine",
            id: 1
        },
        {
            nombre: "Eva",
            apellido: "Luna",
            id:2
        },

    ]

    useEffect(() => {
        // Aqui hacemos el llamado
        console.log("***** Entramos al home y llamamos al servicio de nannies")
        setNannies(nannies2);
        /*
        vehiculosService.getAll()
        .then(data => {
          //console.log("Vehiculos", data)
          setVehiculos(data)
        })
        .catch(error => {
          //TODO: 
        })
        */
    }, [])


    return (


        <View style={styles.container}>
            <View>
                <Text>Lista de Vehiculos</Text>
            </View>
            <ScrollView>
                <View>
                    {nannies.map(nany => {
                        return (
                            <TouchableOpacity
                                key={nany.id}
                                onPress={() => navigation.navigate('about', {
                                    id: nany.id
                                })}

                            >
                                <Card>
                                    <Card.Title>{nany.nombre}</Card.Title>
                                    <Card.Divider />
                                    <View>
                                        <Text>{nany.apellido}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <Icon name='delete' />
                                        </TouchableOpacity>

                                    </View>
                                </Card>
                            </TouchableOpacity>

                        )
                    })}

                </View>
            </ScrollView>


            <StatusBar style="auto" />

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
});
