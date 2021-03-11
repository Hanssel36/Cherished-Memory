import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, TextInput, Image, Dimensions, Pressable, Alert, Modal, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../styles"; 
import { validateForm } from '../../utils/helper';

const ProfileForm = ({newProfile, setNewProfile, storeData}) => {
  const [stepsIndex, setStepsIndex] = useState(0);
	const selectImage = () => {
    let options = {
      title: 'Select Image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
				path: 'images',
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let media = { 
					base64: response.base64,
					uri: response.uri,
				};

        // ADD THIS
        setNewProfile({
					...newProfile,
					media,
				});
      }
    });
  }

  const steps = ["name", "picture", "relationship", "birthday", "additional"]

	return (  
  <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'}}>
    <ScrollView contentContainerStyle={STYLES.modalView}>
      {stepsIndex > 0 &&
        <View style={STYLES.nextButtonContainer}>
        <Pressable style={STYLES.nextButton} onPress = {() => {setStepsIndex(stepsIndex-1)}}>
          <AntDesign name="arrowleft" size={50} color="black" />
          <Text style={STYLES.nextButtonText}>Back</Text>
        </Pressable>
      </View>}
      {stepsIndex === 0 &&     

      <View style={STYLES.formInputContainer}>    
      <Text style={STYLES.formText}>What is the name of your loved one?</Text>
        <TextInput
            style={STYLES.formInput}
            placeholder="Enter Name"
            onChangeText={text => {
              setNewProfile(
                {...newProfile, 
                    name: text,
                })
              }
              }
            
            defaultValue={newProfile.name}
            autoCapitalize="words"
        />
      </View>
      }

      {stepsIndex === 1 && 
      <View style={STYLES.formInputContainer}>
      <Text style={STYLES.formText}>Add a picture of your loved one</Text>
        <View style={STYLES.imageContainer}>
            {newProfile.media === null 
            ? (
              <Image
                  source={require('../../assets/images/placeholderimage.jpg')}
                  style={STYLES.image}
                  resizeMode='contain'
              />
            ) 
            : (
              <Image
                  source={{ uri: newProfile?.media?.uri }}
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
      }

      {stepsIndex === 2 && 
      <View style={STYLES.formInputContainer}>
        <Text style={STYLES.formText}>What is their relationship to you?</Text>
        <TextInput
            style={STYLES.formInput}
            placeholder="Enter Relationship"
            onChangeText={text => setNewProfile(
                {...newProfile, 
                    relationship: text,
                })}
            defaultValue={newProfile.relationship}
            autoCapitalize="words"
        />
      </View>
      }

      {stepsIndex === 3 && 
      <View style={STYLES.formDateInputContainer}>
        <Text style={STYLES.formText}>What is their birthday?</Text>
        <DatePicker 
          date={newProfile.dob}
          // placeholder="Select Date"
          onDateChange={(value) => 
            {
                setNewProfile(
                  {...newProfile, 
                      dob: value,
                  })
              }
          }
          mode="date"
          maximumDate={new Date()}
        />
      </View>
      }
      
      <View>
      {stepsIndex >= 3 
      ?     
        <Pressable 
          style={STYLES.addButton}
          onPress={storeData}
        >
          <Text style={STYLES.addButtonText}>Add New Profile</Text>
        </Pressable>
      :
      <View style={STYLES.nextButtonContainer}>
        <Pressable style={STYLES.nextButton} onPress = {() => {setStepsIndex(stepsIndex+1)}}>
          <AntDesign name="arrowright" size={50} color="black" />
          <Text style={STYLES.nextButtonText}>Next</Text>
        </Pressable>
      </View>
      }
      </View>

    </ScrollView>
    </View>
	);
}

const STYLES = StyleSheet.create({
	modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    minHeight: 500,
    height: 500,
    // minHeight: 500,
    // maxHeight: Dimensions.get('window').height,
  }, 
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
    // height:
  },
  formDateInputContainer: {
    height: 250,
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
  },
  nextButtonContainer: {
    justifyContent: "center",
  },
  nextButton: {
    backgroundColor: COLORS.BASEGREEN,
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  nextButtonText: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  addButtonText: {
    fontSize: 20,
  }
});

export default ProfileForm;