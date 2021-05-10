import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../styles';
import { BACKGROUNDBLUE, BASEBLACK, BASEGREEN, BASEPURPLE } from '../styles/colors';
import styles from '../styles/MyStyle';
global.selectedname = "";
global.selectedrelationship = "";
global.selecteddob = "";

const Profile = ({profile, history}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const dobDateObj = new Date(profile?.dob)
	const dobUTC = {
		month: dobDateObj.getUTCMonth() + 1, //months from 1-12
		day: dobDateObj.getUTCDate(),
		year: dobDateObj.getUTCFullYear(),
	}
	const dob = dobUTC.month+"/"+dobUTC.day+"/"+dobUTC.year;
	const defaultProfileKeys = ["media", "name", "relationship", "dob"];
	const additionalKeys = Object.keys(profile).filter((item) => !defaultProfileKeys.includes(item));
	const [displayOpen, setDisplayOpen] = useState(false);

	const displayFullProfile = () => {
		setDisplayOpen(true);
	}


	

	return (
		<>
			<Pressable style={STYLES.profileCard} onPress={() => {selectedname = profile.name}}>
				

				<Image 
					source={profile?.media?.uri ? {uri: profile?.media?.uri} : require('../assets/images/placeholderprofile.png')}
					style={STYLES.profileCardImage}
				/>
				<Text style={STYLES.profileCardText}>
					Name: {profile?.name}
				</Text>


				<Pressable style = {STYLES.QuizButton} onPress= {() => {selectedname = profile.name;
											selecteddob = profile.dob;
											selectedrelationship = profile.relationship;
											console.log(profile.dob)
					setModalVisible(true)}}><Text style = { [{textAlign:'center', padding: -25}]}>Choose Me!</Text></Pressable>
         
			</Pressable>

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
						<Text style = {STYLES.modalText}> You have selected {selectedname}. Press Start Quiz to begin your quiz on {selectedname}</Text>
						<Pressable
							style = {[STYLES.button], STYLES.buttonClose}
							onPress = {() => setModalVisible(!modalVisible)}>
								<Text style = {STYLES.textStyle}> Yes</Text>
							
						</Pressable>
						
					</View>
				</View>
			
				
				</Modal>

			</>
	);

}

const STYLES = StyleSheet.create({
	profile: {
		justifyContent: "center",
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: COLORS.BACKGROUNDGRAY,
		margin: 20, 
		flex: 1,
	},
	profileImage: {
		aspectRatio: 1,
		width: "75%",
	},
	profileText: {
		fontSize: 24,
	},
	profileCard: {
		padding: 15,
		backgroundColor: COLORS.BACKGROUNDGRAY,
		borderRadius: 15,
		width: "42%",
		margin: 10,
		fontFamily: "Oxygen-Regular",
	},
	profileCardImage: {
		width: '100%',
		height: undefined,
		aspectRatio: 1,
		marginBottom: 10,
	},
	profileCardText: {
		fontSize: 18,
	},
	buttonBackText: {
		fontSize: 24,
	},
	buttonBack: {
		position: "absolute",
		top: 0,
		left: 0,
		flex: 1,
		flexDirection: "row",
		alignItems: 'center',
	},
	buttonRemoveText: {
		fontSize: 20,
		marginHorizontal: 5,
	},
	buttonRemoveProfile: {
		position: "absolute",
		top: 12,
		right: 12,
		padding: 5,
		backgroundColor: COLORS.BASERED,
		borderRadius: 10,
		flex: 1,
		flexDirection: "row",
		alignItems: 'center',
	},
	buttonEditText: {
		fontSize: 24,
		marginHorizontal: 5,
	},
	buttonEditProfile: {
		position: "absolute",
		bottom: 20,
		padding: 5,
		backgroundColor: COLORS.BASEGREEN,
		borderRadius: 10,
		flex: 1,
		flexDirection: "row",
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 300
	  },
	  modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 40,
		padding: 35,
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
	  button: {
		borderRadius: 40,
		padding: 100,
		elevation: 20
	  },
	  buttonOpen: {
		backgroundColor: "#F194FF",
	  },
	  buttonClose: {
		backgroundColor: "#2196F3",
	  },
	  textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	  },
	  modalText: {
		marginBottom: 10,
		textAlign: "center",
	  },
	  QuizButton: { 
        backgroundColor: BASEPURPLE,
        borderRadius: 10,
        marginVertical: 5,
		width: 100,
		height : 20,
		alignSelf : 'center'
    },
	
});

export default Profile;