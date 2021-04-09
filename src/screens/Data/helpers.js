import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveProfiles (profiles) {
  try {
    const jsonValue = JSON.stringify(profiles);
    await AsyncStorage.setItem('profiles', jsonValue);
  } catch (e) {
    console.error(e)
  // saving error
  }
}

export {
  saveProfiles,
}