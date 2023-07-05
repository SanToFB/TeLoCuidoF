import Favoritos from "../components/favoritos";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Card, Icon } from '@rneui/themed';

import GlobalContext from '../components/global/context';


const URL = 'https://localhost:3000/api/';

export default function UsuariosFavoritos() {

    const [favorito, setFavorito] = useState([]);
    const { dataUsuario } = useContext(GlobalContext);


    traerFavoritos(async () => {
        let reqOption = {
            method: 'GET'
        }
        let urlApi = URL + dataUsuario.user._id;
        
        try {
            let data = await fetch(urlApi, reqOption).then(resp => resp.json());
            setFavorito(data);
        }catch(err){
            alert("Error: ", err.message)
        }
        
        
    })
}