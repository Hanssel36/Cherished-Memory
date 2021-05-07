import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Image, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import { FormTextInput, FormImageInput } from "./FormInputs";
import { COLORS } from '../../styles';

const Profile = ({profile, removeProfile, editProfile}) => {
	const dobDateObj = new Date(profile?.dob)
	const dobUTC = {
		month: dobDateObj.getUTCMonth() + 1, //months from 1-12
		day: dobDateObj.getUTCDate(),
		year: dobDateObj.getUTCFullYear(),
	}
	const dob = dobUTC.month+"/"+dobUTC.day+"/"+dobUTC.year;
	const defaultProfileKeys = ["media", "name", "relationship", "dob"];
	const additionalKeys = Object.keys(profile).filter((item) => !defaultProfileKeys.includes(item));
	const [displayType, setDisplayType] = useState("default");
	const [profileEditInput, setProfileEditInput] = useState(profile);

	const displayDefault = () => {
		setDisplayType("default");
	}

	const displayProfileDetail = () => {
		setDisplayType("profileDetail");
	}

	const displayProfileEdit = () => {
		setDisplayType("profileEdit");
	}

	const confirmRemoveProfile = () => {
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
	}
	
	const submitEdits = () => {
		editProfile(profileEditInput);
		displayProfileDetail();
	}

	return (
		<>
		{displayType === "default" &&
			<Pressable style={STYLES.profileCard} onPress={displayProfileDetail}>
				<Image 
					source={profile?.media?.uri ? {uri: profile?.media?.uri} : require('../../assets/images/placeholderprofile.png')}
					style={STYLES.profileCardImage}
				/>
				<View style={STYLES.profileCardTextContainer}>
					<Text style={STYLES.profileCardLabel}>
						Name
					</Text>
					<Text style={STYLES.profileCardText}>
						{profile.name}
					</Text>
				</View>
				<View style={STYLES.profileCardTextContainer}>
					<Text style={STYLES.profileCardLabel}>
						Relationship
					</Text>
					<Text style={STYLES.profileCardText}>
						{profile.relationship}
					</Text>
				</View>
				<View style={STYLES.profileCardTextContainer}>
					<Text style={STYLES.profileCardLabel}>
						Birthday
					</Text>
					<Text style={STYLES.profileCardText}>
					{dob}
					</Text>
				</View>
			</Pressable>
		}

		{displayType === "profileDetail" &&
			<Modal onRequestClose={displayDefault }>
				<View style={STYLES.profile}>
					<Pressable style={STYLES.buttonBack} onPress={displayDefault}>
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
					<View style={STYLES.profileTextContainer}>
						<Text style={STYLES.profileLabel}>
							Name
						</Text>
						<Text style={STYLES.profileText}>
							{profile?.name}
						</Text>
					</View>
					<View style={STYLES.profileTextContainer}>
						<Text style={STYLES.profileLabel}>
							Relationship
						</Text>
						<Text style={STYLES.profileText}>
							{profile?.relationship}
						</Text>
					</View>
					<View style={STYLES.profileTextContainer}>
						<Text style={STYLES.profileLabel}>
							Birthday 
						</Text>
						<Text style={STYLES.profileText}>
							{dob}
						</Text>
					</View>

					{ additionalKeys.map((key) => (
						!!profile[key] &&
						<View style={STYLES.profileTextContainer} key={key}>
							<Text style={STYLES.profileLabel}>
								{key} 
							</Text>
							<Text style={STYLES.profileText}>
								{profile[key]}
							</Text>
						</View>
						))
					}
					<Pressable style={STYLES.buttonEditProfile} onPress={displayProfileEdit}>
						<AntDesign name="edit" size={25} /> 
						<Text style={STYLES.buttonEditText}>
							Edit Profile
						</Text>
					</Pressable>
				</View>
			</Modal>
		}

			{displayType === "profileEdit" &&
			<Modal onRequestClose={displayProfileDetail}>
			<KeyboardAwareScrollView style={STYLES.profileEdit} contentContainerStyle={STYLES.profileEditContainer}>
				<Pressable style={STYLES.buttonBack} onPress={displayProfileDetail}>
					<AntDesign name="arrowleft" size={50} color="black" />
					<Text style={STYLES.buttonBackText}>
						Exit
					</Text>
				</Pressable>

					<FormImageInput 
						imgSource={profileEditInput?.media?.uri ? {uri: profileEditInput?.media?.uri} : require('../../assets/images/placeholderprofile.png')}
						setImage={(media) => {
							setProfileEditInput({
								...profileEditInput,
								media,
							});
						}}
					/>

					<FormTextInput 
							key={"name"}
							label={"Name"} 
							onChangeText={(text) => {
								setProfileEditInput({
									...profileEditInput,
									name: text,
								})
							}}
							defaultValue={profile.name}
							column={false}
						/>
					<FormTextInput 
							key={"relationship"}
							label={"Relationship"} 
							onChangeText={(text) => {
								setProfileEditInput({
									...profileEditInput,
									[key]: text,
								})
							}}
							defaultValue={profile.relationship}
							column={false}
						/>
{/* 
<View style={STYLES.profileTextContainer}>
						<Text style={STYLES.profileLabel}>
							Birthday 
						</Text>
						<Text style={STYLES.profileText}>
							{dob}
						</Text>
					</View> */}

					<View style={STYLES.profileDatePickerContainer}>
						<Text style={STYLES.profileLabel}>
							Birthday
						</Text>
						<View style={STYLES.profileDatePicker}>
							<DatePicker 
								date={new Date(profileEditInput.dob)}
								onDateChange={(value) => 
									{
										setProfileEditInput(
											{...profileEditInput, 
												dob: value,
											})
										}
								}
								mode="date"
								maximumDate={new Date()}
							/>
						</View>
					</View>

					{ additionalKeys.map((key) => (
						!!profile[key] &&
						<FormTextInput 
							key={key}
							label={`${key}`} 
							onChangeText={(text) => {
								setProfileEditInput({
									...profileEditInput,
									[key]: text,
								})
							}}
							defaultValue={profile[key]}
							column={false}
						/>
						))
					}
				<Pressable style={STYLES.buttonSubmitProfile} onPress={submitEdits}>
					<Text style={STYLES.buttonEditText}>
						Submit Changes
					</Text>
				</Pressable>
			</KeyboardAwareScrollView >
		</Modal>
			}
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
	profileEdit: {
		borderRadius: 20,
		backgroundColor: COLORS.BACKGROUNDGRAY,
		margin: 20, 
		flex: 1,
	},
	profileEditContainer: {
		justifyContent: "center",
		alignItems: 'center',
		padding: 5,
		width: "100%",
		borderBottomEndRadius: 20,
	},
	profileImage: {
		aspectRatio: 1,
		width: "75%",
	},
	profileDatePicker: {
		borderBottomColor: "black",
		borderBottomWidth: 1,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		width: "100%",
	},
	profileTextContainer: {
		width: "100%",
		borderBottomColor: "black",
		borderBottomWidth: 1,
		fontSize: 24,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	profileDatePickerContainer: {
		width: "100%",
	},
	profileLabel: {
		fontWeight: "bold",
		fontSize: 24,
		width: "50%",
		textTransform: 'capitalize',
	},
	profileText: {
		fontSize: 24,
		width: "50%",
	},
	profileCard: {
		padding: 15,
		backgroundColor: COLORS.BACKGROUNDGRAY,
		borderRadius: 15,
		width: "42%",
		margin: 10,
	},
	profileCardTextContainer: {
		width: "100%",
		alignItems: "center",
    alignContent: "center",
	},
	profileCardImage: {
		width: '100%',
		height: undefined,
		aspectRatio: 1,
		marginBottom: 10,
	},
	profileCardLabel: {
		fontSize: 18,
		fontWeight: "bold",
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
	buttonSubmitProfile: {
		padding: 5,
		backgroundColor: COLORS.BASEGREEN,
		borderRadius: 10,
		// flex: 1,
		// flexDirection: "row",
		alignItems: 'center',
		marginVertical: 10,
	},
});

export default Profile;