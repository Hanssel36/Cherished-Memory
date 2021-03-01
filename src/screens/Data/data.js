import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
			const jsonValue = JSON.stringify(newData);
			await AsyncStorage.setItem('profiles', jsonValue);
			setNewProfile({
				id: null,
				name: null,
				relationship: null,
				media: null,
				dob: new Date(),
			});
		} catch (e) {
			console.error(e)
		// saving error
		}
	}

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
			<Form newProfile={newProfile} setNewProfile={setNewProfile} storeData={storeData} />

			</ScrollView>
	);
}

Data.navigationOptions = {
	headerTitle: 'Data',
};

const STYLES = StyleSheet.create({
	container: {
		padding: 10,
		flexGrow: 1,
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