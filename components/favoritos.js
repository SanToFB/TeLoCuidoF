import React from 'react';
import { View, ScrollView, Text, StyleSheet} from 'react-native';

function Favorito(props) {

    const Item = ({nombre , apellido}) =>(
        <View style={style.item}>
            <Text style={style.userFavorito}> Nombre: {nombre} Apellido: {apellido}</Text>
        </View>
    );


    return ( 
        <ScrollView>
            {
                props.data.map((item)=>{
                    return(
                        <Item key={item._id} nombre={item.nombre} apellido={item.apellido}/>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item:{
        flex:1,
        flexDirection: 'column',
        alignItems:'center',
        padding:8,
        backgroundColor:`#7fffd4` //aquamarine

    },
    userFavorito:{
        fontStyle:'italic',
        fontSize:16,
        color:`#000000` //black
    }
})