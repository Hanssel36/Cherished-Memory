// Can put all the styles here.

import { StyleSheet} from 'react-native';
import { BASEGREEN, BASEPURPLE } from './colors';

const styles = StyleSheet.create({
    container: {
     justifyContent: 'center',
     flexWrap: "wrap",
     flexDirection: "row",
     paddingVertical: 50
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      margin: 30,
      justifyContent: 'center',
      paddingBottom: 100
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
      backgroundColor: BASEGREEN,
      justifyContent: 'space-between',
      height: 100,
      width: 75,
      position: 'absolute',
      backfaceVisibility: 'hidden',
      
    },
    backButtonText: {
      fontSize: 26,
      textAlign: 'left'
    }
  });

  export default styles;