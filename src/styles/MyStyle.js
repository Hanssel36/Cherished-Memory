// Can put all the styles here.

import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      margin: 40,
      height: 50,
      justifyContent: 'space-between'
    },
    memGameCard: {
      margin: 10,
      backgroundColor: 'purple',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 100,
      width: 75
      
    }
  });

  export default styles;