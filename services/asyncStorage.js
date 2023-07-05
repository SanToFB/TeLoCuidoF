import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    debugger
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log(e.name + ': ' +e.message)
  }
}

const getData = (key) => {

  return new Promise(async (accepted, rejected) =>{
    try {
      debugger
      const value = await AsyncStorage.getItem(key)
      console.log("Esto encuentra", value)
      if(value !== null) {
        // value previously stored
        
        return accepted(value)
      }

      rejected(`${key} no existe`)
    } catch(e) {
      // error reading value
      rejected(e)
    }   
  })
  
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Done.')
}

export default {
  storeData,
  getData,
  clearAll
}