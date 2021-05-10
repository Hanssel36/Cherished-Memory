import React, { useEffect, useState, Component } from 'react';
import { Button, Text, StyleSheet, View, Modal, Image, Pressable, Dimensions, ScrollView, modalOpen, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Form from "./Data/form";

import { saveProfiles } from "./Data/helpers";
import { COLORS } from "../styles";
import Profile from './profilehelp';
import {Data, allProfiles} from './Data/data';



const Selection = ({ history}) => {

	const [modalVisible, setModalVisible] = useState(false);

	const [allProfiles, setAllProfiles] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [newProfile, setNewProfile] = useState({
		// id: null,
		name: null,
		relationship: null,
		media: null,
		dob: new Date(),
	});
	const [modifiedDataToggle, setModifiedDataToggle] = useState(false);

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



	useEffect(()=> {
		// AsyncStorage.clear();
		getData();
	}, [modifiedDataToggle])


	
	return(
		<View style={STYLES.container}>
        <View style = {{flexDirection: 'row'}}>
            <Pressable style={STYLES.backButton} onPress = {() => history.push("/")}>
                <AntDesign name="arrowleft" size={50} color="black" />
								<Text style = {STYLES.backButtonText}>Go Back</Text>
            </Pressable>
        </View>
		
                <Text> Choose who to take Quiz on!</Text>

				<Modal 
					animationType = "slide" 
					transparent = {true}
					visible = {modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}>
				<View>
					<View style = {STYLES.centeredView}/>
					<View style = {STYLES.modalView}>
						<Text style = {STYLES.modalText}> Please click on "Choose Me" on the profile you would like to take a quiz on.</Text>
						<Pressable
							style = {[STYLES.button], STYLES.buttonClose}
							onPress = {() => setModalVisible(!modalVisible)}>
								<Text style = {STYLES.textStyle}> Ok</Text>
							
						</Pressable>
						
					</View>
				</View>
			
				
				</Modal>
	
		<ScrollView contentContainerStyle={STYLES.profileContainer}>
		
			<View style={STYLES.displayProfilesContainer}>
				{
					allProfiles.map((profile, index) => (
						<Profile key={`${profile.name}${index}`} profile={profile} removeProfile={()=>removeProfile(index)} />
					))
				}
			</View>
			

			</ScrollView>
			<Pressable onPress = {() => {selectedname == "" ? setModalVisible(!modalVisible) : history.push("/multiplechoice");}}>
				
				<Text style = {STYLES.text}>Start Quiz!</Text>
			</Pressable>

				<Text> HELLO</Text>
		</View>
	);
}

// Data.navigationOptions = {
// 	headerTitle: 'Data',
// };

const STYLES = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BACKGROUNDBLUE,
		minHeight: Dimensions.get('window').height,
		maxHeight: Dimensions.get('window').height,
	},
	imageContainer: {
    marginVertical: 20,
		alignItems: 'center',
		
    // borderWidth: 5,
    // borderColor: '#ff5555'
	},
	backButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: 'center',
	},
	backButtonText: {
		fontSize: 26,
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
		textAlign: 'center',
		padding : 40
	},
	displayProfilesContainer: {
		flexDirection: "row",
		width: Dimensions.get('window').width, 
		flexWrap: "wrap",
		padding: 5,
		justifyContent: "center",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 40,
		padding: 50,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	  },

});

export default Selection;