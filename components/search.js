import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import FlatListNannies from './flatList';

const page = 'Search'
export default function Search({navigation}) {
  const URL = 'http://localhost:3000/nannies/api/'

  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);
  const [selected6, setSelected6] = useState(false);
  const [data, setData] = useState('');

  async function setSearch() {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    let request = {
      method: "GET",
      headers: headers,
    }
    let urlApi = URL + param1 + param2
    try {
      const datas = await fetch(urlApi, request).then(resp => resp.json());
      setData(datas)
      debugger
      console.log(JSON.stringify(datas));

    } catch (err) {
      console.error(err.message);
    }
  }

  function seleccionar(title) {
    setSelected1(false)
    setSelected2(false)
    setSelected3(false)
    if (title === "Nannies") {
      setSelected1(true)
      setParam2('');
    }
    if (title === "Cuida Mascota") {
      setSelected2(true)
      setParam2('');
    }
    if (title === "Por Turno") {
      setSelected3(true)
    }
  }

  function seleccionar2(title) {
    setSelected4(false)
    setSelected5(false)
    setSelected6(false)
    if (title === "mañana") {
      setSelected4(true)
    }
    if (title === "tarde") {
      setSelected5(true)
    }
    if (title === "noche") {
      setSelected6(true)
    }
  }

  return (
    <View style={StyleSheet.container}>
      <View style={{ flexDirection: "row", marginLeft: 3, justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={selected1 ? styles.selected : styles.button}
            onPress={() => {
              setParam1('nannies')
              seleccionar('Nannies')
            }}
          >Nannies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={selected2 ? styles.selected : styles.button}
            onPress={() => {
              setParam1('nanniesByMascota/true')
              seleccionar('Cuida Mascota')
            }}
          >Cuida Mascota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={selected3 ? styles.selected : styles.button}
            onPress={() => {
              setParam1('nanniesByTurno')
              seleccionar('Por Turno')
            }}
          >Por Turno</Text>
        </TouchableOpacity>
      </View>
      {param1 === 'nanniesByTurno' ? (
        <View>
          <Text style={styles.title}>Seleccionar turno deseado:</Text>
          <View style={{ flexDirection: "row", marginLeft: 3, justifyContent: "space-between" }}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={selected4 ? styles.selected : styles.button}
                onPress={() => {
                  setParam2('/mañana')
                  seleccionar2('mañana')
                }}
              >Mañana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={selected5 ? styles.selected : styles.button}
                onPress={() => {
                  setParam2('/tarde')
                  seleccionar2('tarde')
                }}
              >tarde</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={selected6 ? styles.selected : styles.button}
                onPress={() => {
                  setParam2('/noche')
                  seleccionar2('noche')
                }}
              >noche</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>

        </View>
      )}

      <View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.button2}
            onPress={() => setSearch()}
          >Buscar</Text>
        </TouchableOpacity>

      </View>
      <SafeAreaView>
        <FlatListNannies nannies={data} navigation={navigation} page={page}/>
      </SafeAreaView>
    </View>
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

//export default Search;
