import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeRouter, Route, Link } from "react-router-native";
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
// import { COLORS } from "STYLES"; 
import Form from "./form";
import Profile from "./profile";
import { COLORS } from "../../styles";

const Data = ({ history}) => {
	// states
	const [allProfiles, setAllProfiles] = useState([]);
	
	const [newProfile, setNewProfile] = useState({
		id: null,
		name: null,
		relationship: null,
		media: null,
		dob: new Date(),
	});

	// util functions get/store data
	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('profiles');
			setAllProfiles(jsonValue ? JSON.parse(jsonValue) : []);
		} catch (e) {
			console.error(e)
			// read error
		}
	}

	const storeData = async () => {
		try {
			const newData = [...allProfiles, ...[newProfile]];
			setAllProfiles(newData);
			const jsonValue = JSON.stringify(newData)
			await AsyncStorage.setItem('profiles', jsonValue)
		} catch (e) {
			console.error(e)
		// saving error
		}
	}

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
				console.log(media);
        setNewProfile({
					...newProfile,
					media,
				});
      }
    });
  }

	// useEffect(() => {
	// 	storeData();
	// }, [allProfiles])

	useEffect(()=> {
		// AsyncStorage.clear();
		getData();
	}, [])

	return(
		// <View style={STYLES.container}>
			<ScrollView contentContainerStyle={STYLES.container}>
			<View>
				<Button title = "Back"  onPress = {() => history.push("/")}/>
			</View>
			<Text>User Profile</Text>
			{allProfiles?.length > 0 ?
			<View>
				<Text>Existing Profiles</Text>
				{
					allProfiles.map((profile, index) => (
						<Profile key={`${profile.name}${index}`} profile={profile} />
					))
				}
			</View>
			: 
			<Text>No Profiles to show</Text>
				}
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

			</ScrollView>
	);
}

Data.navigationOptions = {
	headerTitle: 'Data',
};

const STYLES = StyleSheet.create({
	container: {
		padding: 10,
		flexGrow: 1
	},
	imageContainer: {
    marginVertical: 20,
    // borderWidth: 5,
    // borderColor: '#ff5555'
  },
  imageBox: {
    width: 256,
    height: 256
  }
});

export default Data;