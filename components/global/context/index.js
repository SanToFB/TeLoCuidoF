import { createContext } from 'react';

const authData = {
  nombre: null,
  apellido: null,
  mail: null
};

const dataUsuario = {
  token: '',
  usuario: {

    _id: '',
    isNanny: null,
    nombre: '',
    apellido: '',
    fecha_nacimiento: null,
    ciudad: null,
    dni: null,
    turno: null,
    dias: null,
    mail: null,
    cuidaMascotas: null,
    favoritos: null,
  }
  // authenticated: false
}

const DataContext = createContext(dataUsuario)


export default DataContext;
export {
  dataUsuario
}