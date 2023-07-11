import { StyleSheet, Text, View, Button } from 'react-native';

export default function DataProfile({ navigation, route }) {

    let data = route.params;
    let cuida = data.cuidaMascotas ? "Si" : "No"

    let dias = '';
    data.dias.forEach((e) => dias += e + " ")
    let turnos = ''
    data.turno.forEach((e) => turnos += e + " ")
    function goMessage() {
        navigation.navigate('Message', data)
    }

    function goBack() {
        navigation.goBack()
    }

    return (
        <View style={[styles.container, { flexDirection: 'column' }]}>
            <Text>"Niñera"</Text>
            <Text>"Cuida Mascotas: " {cuida}</Text>
            <Text style={styles.info}>Nombre y Apellido: {data.nombre} {data.apellido}</Text>
            <Text style={styles.info}>Fecha Nacimiento: {data.fecha_nacimiento}</Text>
            <Text style={styles.info}>Ciudad: {data.ciudad}</Text>
            <Text style={styles.info}>Turnos: {turnos}</Text>
            <Text style={styles.info}>Dias disponible: {dias}</Text>
            <Text style={styles.info}>Mail de contacto: {data.mail}</Text>
            <Button style={styles.button}
                onPress={() => goMessage()}
                title="Enviar Mensaje"
                color="#5f9ea0"
            />
            <Button style={styles.button}
                onPress={ () => goBack()}
                title="Volver"
                color="#ff7f50"
            />
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
    info: {
        fontStyle: "italic",
        fontSize: 14
    },
    button: {
        fontSize: 14,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 15,
        marginLeft: 10,
        backgroundColor: `#87cefa`, //lightskyblue 
        color: 'black',
        minWidth: '80%',
        textAlign: 'center',
        textTransform: "uppercase"
    },
});