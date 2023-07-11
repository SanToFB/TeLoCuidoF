import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Text, View } from 'react-native';

export default function FlatListMessages({ mensajes, navigation, route }) {
    console.log(mensajes)

    const Item = ({ item }) => (
        <View style={styles.container}>
                <Text style={styles.title}>{item.sender}: {item.mensaje}</Text>
                <Text style={styles.title}>{item.date}</Text>
        </View>
    );

    return (
        <SafeAreaView>
            <FlatList
                data={mensajes}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item._id.toString()}
                ItemSeparatorComponent={() => "-------------------------------------------"}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 3,
    },
    item: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 14,
    },
});