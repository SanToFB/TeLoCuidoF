import React from 'react';

export const authData = {

    nombre: "Nana",
    apellido: "Fine",
    mail: "lananafine@hotmail.com"

    //Se usa en ContextApi - comentamos para usar el reducer
    // ,
    // cambioNombre: (nombre) => {
    //   setAuthData({ ...authData, nombre});
    // }
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return { ...state, nombre: action.nombre }
            break;
        case 'CHANGE_MAIL':
            return { ...state, mail: action.mail }
            break;
        default:
            break;
    }
}
