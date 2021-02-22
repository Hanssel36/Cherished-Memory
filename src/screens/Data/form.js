import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeRouter, Route, Link } from "react-router-native";
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from "../../styles"; 

const ProfileForm = ({newProfile, setNewProfile, storeData}) => {
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

	return (
<View>
<Text>Add a picture of your loved one</Text>
<View style={STYLES.imageContainer}>
    {newProfile.media === null ? (
        <Image
            source={require('../../assets/images/placeholderimage.jpg')}
            style={STYLES.imageBox}
            resizeMode='contain'
        />
    ) : (
        <Image
            source={{ uri: newProfile.media.uri }}
            style={STYLES.imageBox}
            resizeMode='contain'
        />
    )}
</View>
<TouchableOpacity
    onPress={selectImage}
    style={[
        STYLES.selectButtonContainer,
        { backgroundColor: COLORS.BASEPURPLE }
    ]}
>
    <Text style={STYLES.selectButtonTitle}>Choose a picture</Text>
</TouchableOpacity>
<Text>What is their name?</Text>
<TextInput
    style={{height: 40}}
    placeholder="Enter Name"
    onChangeText={text => setNewProfile(
        {...newProfile, 
            name: text,
        })}
    defaultValue={newProfile.name}
    autoCapitalize="words"
/>
<Text>What is their relationship to you?</Text>
<TextInput
    style={{height: 40}}
    placeholder="Enter Relationship"
    onChangeText={text => setNewProfile(
        {...newProfile, 
            relationship: text,
        })}
    defaultValue={newProfile.relationship}
    autoCapitalize="words"
/>
<Text>What is their birthday?</Text>
<DatePicker 
    date={newProfile.dob}
    onDateChange={(value) => setNewProfile(
        {...newProfile, 
            dob: value,
        }
    )}
    mode="date"
/>
<Button
					title="Add New Profile"
					onPress={storeData}
				/>
</View>
	);
}

const STYLES = StyleSheet.create({
	container: {
		padding: 10,
	},
	imageContainer: {
    marginVertical: 20,
  },
  imageBox: {
    width: 256,
    height: 256
  }
});

export default ProfileForm;