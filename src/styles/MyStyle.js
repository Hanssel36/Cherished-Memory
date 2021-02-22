// Can put all the styles here.

import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
     justifyContent: 'space-between',
     flexWrap: "wrap",
     flexDirection: "row"
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      margin: 40,
      height: 50,
      justifyContent: 'space-between'
    },
    backfacecard:{
      margin: 10,
      flexDirection: 'row',
      height: 100,
      width: 75,
      top: -10,
      left: -10,
    },
    memGameCard: {
      flexDirection: 'row',
      backgroundColor: 'purple',
      justifyContent: 'space-between',
      height: 100,
      width: 75,
      position: 'absolute',
      backfaceVisibility: 'hidden',
      
    }
  });

  export default styles;