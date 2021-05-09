import AsyncStorage from '@react-native-async-storage/async-storage';

const saveProfiles = async (profiles) => {
  try {
    const jsonValue = JSON.stringify(profiles);
    await AsyncStorage.setItem('profiles', jsonValue);
  } catch (e) {
    console.error(e)
  // saving error
  }
}

const getProfiles = async (setAllProfiles) => {
  try {
    const jsonValue = await AsyncStorage.getItem('profiles');
    setAllProfiles(jsonValue ? JSON.parse(jsonValue) : []);
  } catch (e) {
    console.error(e)
    // read error
  }
}

export {
  saveProfiles,
  getProfiles,
}