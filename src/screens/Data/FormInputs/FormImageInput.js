import React from 'react';
import { Text, StyleSheet, View, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from "../../../styles"; 
import {options} from "../../../utils/constants"

const FormImageInput = ({label, imgSource, setImage, ...props}) => {

  const selectImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let media = { 
					base64: response?.base64,
					uri: response?.uri,
				};

        // ADD THIS
        setImage(media);
      }
    });
  }

	return (
    <View style={STYLES.formInputContainer}>
      <Text style={STYLES.formText}>{label}</Text>
      <View style={STYLES.imageContainer}>
          {!imgSource 
          ? (
            <Image
                source={require('../../../assets/images/placeholderimage.jpg')}
                style={STYLES.image}
                resizeMode='contain'
            />
          ) 
          : (
            <Image
                source={{uri: imgSource.uri}}
                style={STYLES.image}
                resizeMode='contain'
            />
          )}
      </View>

      <Pressable
          onPress={selectImage}
          style={STYLES.addButton}
      >
        <Text style={STYLES.selectButtonTitle}>Choose a picture</Text>
      </Pressable>
    </View>
	);
}

const STYLES = StyleSheet.create({
  formInputContainer: {
    alignItems: "center",
    alignContent: "center"
  }, 
  formText: {
    fontSize: 25,
    textAlign: 'center',
  },
  formInput: {
    fontSize: 20,
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200, 
  },
  addButton: {
    backgroundColor: COLORS.BASEPURPLE,
    borderRadius: 20,
		padding: 10,
		elevation: 2,
    fontSize: 16,
  },
});

export default FormImageInput;
