import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Image, Pressable, Dimensions } from 'react-native';
import { COLORS } from '../../styles';

const Profile = ({profile}) => {
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
		{displayOpen ?
			<Modal onRequestClose={() => setDisplayOpen(false) }>
				<View style={STYLES.profile}>
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
		height: Dimensions.get('window').height, 
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
	}
});

export default Profile;