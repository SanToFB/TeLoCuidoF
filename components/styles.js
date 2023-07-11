import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({

    container: {   
        marginTop: 20,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerGoogle: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
        color: `#000000`
    },
    text1: {
        fontSize: 16,
        margin: 5,
        padding: 5,
        color: `#000000` //black
    },
    input: {
        borderRadius: 3,
        padding: 10,
        paddingTop: 3,
        marginTop: 5,
        backgroundColor: `#5f9ea0`, //cadetblue  
        color: `#000000`, //black
        paddingVertical: 6,
    },
    button: {
        elevation: 8,
        minWidth: '40%',
        padding: 5,
        marginTop: 15,
        borderRadius: 10,
        paddingVertical: 1,
        paddingHorizontal: 10,
        backgroundColor: '#00ffff' //`#f0f8ff` //aliceblue
    },
    buttonText: {
        fontSize: 16,
        padding: 5,
        fontStyle: 'italic',
        color: `#000000`, //black
        minWidth: '40%',
        textAlign: 'center',
        backgroundColor: '#00ffff'
    },
    buttonContainer: {
        elevation: 8,
        minWidth: '30%',
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 3,
        margin:5
    },
    button2: {
        fontSize: 14,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 15,
        marginLeft: 5,
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
    }
})