import { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, FlatList } from "react-native";

const Item = ({ title }) => (
    <View>
        <Text style={styles.title}>{title}</Text>
    </View>
)

export default function Message() {
    const [newMessage, setMessage] = useState(" ");
    const message = " Probando que se puede facer"

    const sendMessage = () => {
        send(newMessage);
        setMessage("");
    }

    const renderItem = ({ item }) => {
        <Item title={item.title} />
    }


    const scrollRef = useRef();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title} > Mensajes: </Text>
                </View>
                <View sttyle={styles.chat}>
                    <ScrollView
                        style={styles.messageBox}
                        ref={scrollRef}
                        onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
                    >
                        <FlatList
                            data={message}
                            renderItem={renderItem}
                            keyExtrator={(item) => item.id}
                        />
                    </ScrollView>
                    <View style={styles.row}>
                        <View style={styles.windowInput}>
                            <TextInput
                                style={styles.textInput}
                                editable
                                placeholder="Escribe un mensaje"
                                type="text"
                                maxLength={80}
                                //value={newMessage}
                                onChangeText={(text) => setMessage(text)}
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.enviar}
                                    onPress={sendMessage}
                                >
                                    <Text style={styles.textButton}>Enviar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        padding: 10,
        backgroundColor: "aliceblue", //aliceblue , beige
        
    },
    title: {
        fontSize: 20
    },
    chat: {
        flexDirection: "column",
        flexWrap: "wrap",
        flex: 1,
        // backgroundColor: "Cyan",
        //padding: 5,
        //height: 500,
        //borderRadius: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
        //alignItems: "center",
        //display: "flex"
    },
    messageBox: {
        fontSize: 18,
        padding: 5,
        flex: 1,
        width: "100%",
        backgroundColor: "Beige"
    },
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: "black",
        borderRadius:5,
        marginHorizontal:10,
        marginTop:5,
        fontSize: 18,
    },
    textButton: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: 'oldlace',
       // alignSelf: 'flex-start',
        //marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '38%',
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        //backgroundColor: 'grey',
        //height: 45,
        //overflow: 'hidden',
        borderRadius: 4,
        //fontSize: 20,
        //color: 'black'
    },
    enviar: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        padding: 10,
        height: 45,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'grey',
        fontSize: 20,
        color: 'black',
        flex: 1,
    },
    windowInput: {
        flex: 1,
        width: "70%",
        height: "50%",
        padding: 3,

    },

})




