import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Text, View } from 'react-native';

export default function FlatListNannies({ nannies, navigation, page }) {

    //let page = route.params;
    const Item = ({ item }) => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item}>
                <Text
                    style={styles.title}
                    onPress={() => navegar(item)}
                >{item.nombre} {item.apellido}</Text>
            </TouchableOpacity>
        </View>
    );

    function navegar(item) {
        if (page === 'Search') {
            navigation.navigate("DataProfile", item)
        }
        if (page === 'Profile') {
            navigation.navigate("Message", item)
        }
    }


    return (
        <SafeAreaView>
            <FlatList
                data={nannies}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item._id.toString()}
                ItemSeparatorComponent={() => "--------------"}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 3,
    },
    item: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
    },
});