import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, Modal, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Form from "./form";
import Profile from "./profile";
import {validateForm} from "../../utils/helper"
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
			// if (validateForm(newProfile)) {
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
			// } else {
			// 	// setErrorMessage(newProfile);
			// }
		} catch (e) {
			console.error(e)
		// saving error
		}
	}

	useEffect(()=> {
		AsyncStorage.clear();
		getData();
	}, [])

	return(
		// <View style={STYLES.container}>
		<View style={STYLES.container}>
        <View style = {{flexDirection: 'row'}}>
            <Pressable onPress = {() => history.push("/")}>
                <AntDesign name="arrowleft" size={50} color="black" />
            </Pressable>
            <Text style = {STYLES.backButtonText}>Go Back</Text>
        </View>

		<Modal
			// transparent={true}
			visible={modalOpen}
			onRequestClose={() => {
				setModalOpen(false);
			}}
		> 
			<Form newProfile={newProfile} setNewProfile={setNewProfile} storeData={storeData} />
		</Modal>

		<ScrollView contentContainerStyle={STYLES.profileContainer}>
			<View style={STYLES.icon}>
			<Image 
				source = {require('../../assets/images/DataLogo.png')}
			/>
			</View>
			{/* <Text>User Profile</Text> */}
			{allProfiles?.length > 0 ?
			<View style={STYLES.displayProfilesContainer}>
				{/* <Text>Existing Profiles</Text> */}
				{
					allProfiles.map((profile, index) => (
						<Profile key={`${profile.name}${index}`} profile={profile} />
					))
				}
			</View>
			: 
			<Text style={STYLES.emptyProfileText}>Add a profile of a family member or friend!</Text>
				}
		</ScrollView>

			
			<Pressable style = {STYLES.addButton}  onPress = {() => setModalOpen(true)}>
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
		flex: 1,
		backgroundColor: COLORS.BACKGROUNDGREEN,
		minHeight: Dimensions.get('window').height,
		maxHeight: Dimensions.get('window').height,
	},
	imageContainer: {
    	marginVertical: 20,
		alignItems: 'center',
		
    // borderWidth: 5,
    // borderColor: '#ff5555'
	},
    backButtonText: {
		fontSize: 26,
		textAlign: 'left'
	},
	imageBox: {
		width: 256,
		height: 256
	},
	icon: {
			// justifyContent: 'center',
		alignItems: 'center',
	},
	emptyProfileText: {
		textAlign: "center",
		fontSize: 30,
		padding: 20,
	},	
	addButton: {
		alignItems: 'center',
		marginBottom: 40,
		marginTop: 20,
	},
	text:{
		fontSize: 26,
		textAlign: 'center'  
	},
	displayProfilesContainer: {
		flexDirection: "row",
		width: Dimensions.get('window').width, 
		flexWrap: "wrap",
		padding: 5,
		justifyContent: "center",
	},
});

export default Data;