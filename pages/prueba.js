import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import FlatListNannies from '../components/flatList';


export default function Prueba() {
    const data = [
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 1
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 2
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 3
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 4
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 5
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 6
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 7
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 11
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 12
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 13
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 14
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 15
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 16
        },

        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 17
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 133
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 122
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 132
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 1257
        },
        {
            nombre: "juana",
            apellido: "iglesias",
            _id: 143
        },
    ]


    return (
        <View>
    
          <SafeAreaView>
            <View>
            <FlatListNannies nannies={data} />
    
            </View>
          </SafeAreaView>
        </View >
      )


}


const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        backgroundColor: 'aliceblue',
    },
    buttonContainer: {
        elevation: 8,
        minWidth: '30%',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 3
    },
    button2: {
        fontSize: 15,
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: `#2f4f4f`, //darkslategrey  
        color: 'black',
        alignSelf: 'flex-start',
        minWidth: '30%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
    button: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: `#87cefa`, //lightskyblue 
        color: 'black',
        minWidth: '80%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
    selected: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: `#66cdaa`,
        color: `black`, //navy
        minWidth: '50%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
    title: {
        fontSize: 14,
        padding: 8,
        textAlign: 'center',
        alignSelf: 'center',
        minWidth: 10,
        color: `#000000`,
    },

});