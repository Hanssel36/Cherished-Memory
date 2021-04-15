import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../styles';

const Profile = ({profile, removeProfile}) => {
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

	const confirmRemoveProfile = () => 
		Alert.alert(
			"Warning",
			"Are you sure you want to remove this profile? This will be permanently gone!",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ 
					text: "Yes, Remove Profile",
					onPress: removeProfile,
					style: "destructive"
				}
			],
			{
				cancelable: true,
				// onDismiss: () =>
				// 	Alert.alert(
				// 		"This alert was dismissed by tapping outside of the alert dialog."
				// 	),
			}
		);
	

	return (
		<>
		{displayOpen ?
			<Modal onRequestClose={() => setDisplayOpen(false) }>
				<View style={STYLES.profile}>
					<Pressable style={STYLES.buttonBack} onPress={() => setDisplayOpen(false)}>
						<AntDesign name="arrowleft" size={50} color="black" />
						<Text style={STYLES.buttonBackText}>
							Exit
						</Text>
					</Pressable>
					<Pressable style={STYLES.buttonRemoveProfile} onPress={confirmRemoveProfile}>
						<AntDesign name="closecircleo" size={25}/>
						<Text style={STYLES.buttonRemoveText}>
							Remove Profile
						</Text>
					</Pressable>
					<Image 
						source={profile?.media?.uri ? {uri: profile?.media?.uri} : require('../../assets/images/placeholderprofile.png')}
						style={STYLES.profileImage}
					/>
					<Text style={STYLES.profileText}>
						Name: {profile?.name}
					</Text>
					<Text style={STYLES.profileText}>
						Relationship: {profile?.relationship}
					</Text>
					<Text style={STYLES.profileText}>
						Birthday: {dob}
					</Text>
					{ additionalKeys.map((key) => (
						!!profile[key] &&
						<Text key={key} style={STYLES.profileText}>
							{key}: {profile[key]}
						</Text>
						))
					}
					<Pressable style={STYLES.buttonEditProfile} onPress={()=>{}}>
						<AntDesign name="edit" size={25} /> 
						<Text style={STYLES.buttonEditText}>
							Edit Profile
						</Text>
					</Pressable>
				</View>
			</Modal>
		:
			<Pressable style={STYLES.profileCard} onPress={displayFullProfile}>
				<Image 
					source={profile?.media?.uri ? {uri: profile?.media?.uri} : require('../../assets/images/placeholderprofile.png')}
					style={STYLES.profileCardImage}
				/>
				<Text style={STYLES.profileCardText}>
					Name: {profile?.name}
				</Text>
				<Text style={STYLES.profileCardText}>
					Relationship: {profile?.relationship}
				</Text>
				<Text style={STYLES.profileCardText}>
					Birthday: {dob}
				</Text>
			</Pressable>}
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
	}
});

export default Profile;