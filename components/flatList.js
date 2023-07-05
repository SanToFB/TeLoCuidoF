import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Text, View } from 'react-native';

export default function FlatListNannies({ nannies, navigation, route }) {

    const Item = ({ item, onPress }) => (
        <TouchableOpacity onPress={contactar(item._id)} style={styles.item}>
            <Text style={styles.title}>{item.nombre} {item.apellido}</Text>
        </TouchableOpacity>
    );

    function contactar(id) {
       // navigation.navigate("Perfil", id)
       console.log("hola")
    }

    return (
        <SafeAreaView>
            <FlatList
                data={nannies}
                renderItem={({ item }) => {
                    return (<TouchableOpacity onPress={contactar(item._id)} style={styles.item}>
                        <Text >{item.nombre} {item.apellido}</Text>
                    </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item._id.toString()}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});