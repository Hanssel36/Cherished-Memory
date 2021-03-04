// Can put all the styles here.

import { StyleSheet} from 'react-native';
import { BASEPURPLE } from './colors';

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
      backgroundColor: BASEPURPLE,
      justifyContent: 'space-between',
      height: 100,
      width: 75,
      position: 'absolute',
      backfaceVisibility: 'hidden',
      
    }
  });

  export default styles;