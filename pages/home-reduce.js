import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useEffect, useReducer, useState } from 'react';

import GlobalContext from '../components/global/context';
import { TextInput } from 'react-native-web';
import { reducer , authData } from '../services/global/index'
//importa el reducer del service y la data que me interesa guardar (authData)
export default function HomeReduce({ navigation }) {

    
    const [state, dispatch] = useReducer(reducer, authData);
    const [nombre, setNombre] = useState(context.nombre);

    const cambioNombre = () => {
        dispatch({type: 'CHANGE_NAME', NOMBRE});
    }

    useEffect(()=> {
        console.log("=================");
        console.log(state);
        console.log("=================");
    }, [] 
    )

    return (
        <View style={styles.container}>
            <Text>Home Page   </Text>
            <StatusBar style="auto" />
            <View>
                <Text> Nombre: {state.nombre} </Text>
                <Text> Apellido: {state.apellido} </Text>
                <Text> Mail: {state.mail} </Text>
            </View>


            <TextInput
                value={nombre}
                onChangeText={setNombre}
                placeholder={'Nombre'}
            />

            <Button
                title={'Ir a About'}
                onPress={() => navigation.navigate('About')} />

            <Button
                title={'Cambiar Nombre'}
                onPress={CambioNombre} />

            <Button
                title={'Logout'}
                onPress={() => context. setAuthenticated(false)} />

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
