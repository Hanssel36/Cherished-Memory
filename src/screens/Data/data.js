import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, Modal, Image, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from "./form";
import Profile from "./profile";
import { COLORS } from "../../styles";

const Data = ({ history}) => {
	// states
	const [allProfiles, setAllProfiles] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
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
			setModalOpen(false);
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
		<View style={STYLES.container}>
			<View>
				<Button title = "Back"  onPress = {() => history.push("/")}/>
			</View>
			<View style={STYLES.icon}>
			<Image 
				source = {require('../../assets/images/DataLogo.png')}
			/>
			</View>
			{/* <Text>User Profile</Text> */}
			{allProfiles?.length > 0 ?
			<View style={STYLES.profilesContainer}>
				{/* <Text>Existing Profiles</Text> */}
				{
					allProfiles.map((profile, index) => (
						<Profile key={`${profile.name}${index}`} profile={profile} />
					))
				}
			</View>
			: 
			<Text>No Profiles to show</Text>
				}

			<Modal
				visible={modalOpen}
				onRequestClose={() => {
					setModalOpen(false);
				}}
			> 
				<Form newProfile={newProfile} setNewProfile={setNewProfile} storeData={storeData} />
			</Modal>
			
			<Pressable style = {STYLES.button}  onPress = {() => setModalOpen(true)}>
				<Image 
					source = {require('../../assets/images/add-btn.png')} 
				/>
			</Pressable>

		</View>
	);
}

Data.navigationOptions = {
	headerTitle: 'Data',
};

const STYLES = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: COLORS.BACKGROUNDGREEN
	},
	imageContainer: {
    	marginVertical: 20,
		alignItems: 'center',
		
    // borderWidth: 5,
    // borderColor: '#ff5555'
	},

	imageBox: {
		width: 256,
		height: 256
	},
	icon: {
			// justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		alignItems: 'center',
	},
	text:{
		fontSize: 26,
		textAlign: 'center'  
	},
	profilesContainer: {
		flexDirection: "row",
		width: Dimensions.get('window').width, 
		flexWrap: "wrap",
		justifyContent: 'center',
	},
});

export default Data;