import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Image, Pressable, Dimensions, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import { FormTextInput, FormImageInput } from "./FormInputs";
import {useGlobal} from "../../context/GlobalContext";
import { COLORS } from '../../styles';
import {profileDefaultKeys, profileAdditionalKeys} from "../../utils/constants";

const Profile = ({profile, removeProfile, editProfile}) => {
	const dobDateObj = new Date(profile?.dob)
	const dobUTC = {
		month: dobDateObj.getUTCMonth() + 1, //months from 1-12
		day: dobDateObj.getUTCDate(),
		year: dobDateObj.getUTCFullYear(),
	}
	const dob = dobUTC.month+"/"+dobUTC.day+"/"+dobUTC.year;
	const [customKeys, setCustomKeys] = useState(Object.keys(profile).filter((item) => { return !profileDefaultKeys.includes(item) && !profileAdditionalKeys.includes(item)}));
	const [displayType, setDisplayType] = useState("default");
	const [profileEditInput, setProfileEditInput] = useState(profile);
	const [{caregiverModeOn}] = useGlobal();
	const [customKey, setCustomKey] = useState(""); 
	const [customValue, setCustomValue] = useState(""); 

	const displayProfileDefault = () => {
		setDisplayType("default");
	}

	const displayProfileDetail = () => {
		setDisplayType("profileDetail");
	}

	const displayProfileEdit = () => {
		setDisplayType("profileEdit");
	}

	const addCustomInfo = () => {
		if (!customKey || !customValue) {
			return;
		}

		if (customKeys.includes(customKey)) {
			Alert.alert("That information type already exists. Please enter a different one.")
			return;
		}

		setProfileEditInput({
			...profileEditInput,
			[customKey]: customValue,
		})
		setCustomKey("");
		setCustomValue("");
		setCustomKeys([
			...customKeys,
			customKey,
		])
	}

	const removeCustomInfo = (customInfoKey) => {
		let remainingProfileInfo = profileEditInput;
		delete remainingProfileInfo.customInfoKey;
		setProfileEditInput(remainingProfileInfo);

		let newCustomKeys = customKeys.slice();
		var customInfoIndex = newCustomKeys.indexOf(customInfoKey);
		if (customInfoIndex !== -1) {
			newCustomKeys.splice(customInfoIndex, 1);
		}
		setCustomKeys(newCustomKeys);
		
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
			<Modal onRequestClose={displayProfileDefault}>
				<KeyboardAwareScrollView style={STYLES.profileModal} contentContainerStyle={STYLES.profileModalContainer}>
					<Pressable style={STYLES.buttonBack} onPress={displayProfileDefault}>
						<AntDesign name="arrowleft" size={50} color="black" />
						<Text style={STYLES.buttonBackText}>
							Exit
						</Text>
					</Pressable>

					{!caregiverModeOn &&
						<Pressable style={STYLES.buttonRemoveProfile} onPress={confirmRemoveProfile}>
						<AntDesign name="closecircleo" size={25}/>
						<Text style={STYLES.buttonRemoveText}>
							Remove Profile
						</Text>
					</Pressable>}


					<View style={STYLES.profileDetailInfo}>
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

						{ profileAdditionalKeys.map((key) => (
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

						{ customKeys.map((key) => (
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
					</View>
					{!caregiverModeOn &&
						<Pressable style={STYLES.buttonEditProfile} onPress={displayProfileEdit}>
							<AntDesign name="edit" size={25} /> 
							<Text style={STYLES.buttonEditText}>
								Edit Profile
							</Text>
						</Pressable>
					}
				</KeyboardAwareScrollView>
			</Modal>
		}

			{displayType === "profileEdit" &&
			<Modal onRequestClose={displayProfileDetail}>
			<KeyboardAwareScrollView style={STYLES.profileModal} contentContainerStyle={STYLES.profileModalContainer}>
				<Pressable style={STYLES.buttonBack} onPress={displayProfileDetail}>
					<AntDesign name="arrowleft" size={50} color="black" />
					<Text style={STYLES.buttonBackText}>
						Exit
					</Text>
				</Pressable>

					<FormImageInput 
						imgSource={profileEditInput?.media?.uri ? {uri: profileEditInput?.media?.uri} : require('../../assets/images/placeholderprofile.png')}
						setImage={(media) => {
      console.log("🚀 ~ file: profile.js ~ line 223 ~ removeCustomInfo ~ newCustomKeys", newCustomKeys)
      console.log("🚀 ~ file: profile.js ~ line 222 ~ removeCustomInfo ~ newCustomKeys", newCustomKeys)
      console.log("🚀 ~ file: profile.js ~ line 222 ~ removeCustomInfo ~ newCustomKeys", newCustomKeys)
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
							defaultValue={profileEditInput.name}
							column={false}
						/>
					<FormTextInput 
							key={"relationship"}
							label={"Relationship"} 
							onChangeText={(text) => {
								setProfileEditInput({
									...profileEditInput,
									relationship: text,
								})
							}}
							defaultValue={profileEditInput.relationship}
							column={false}
						/>
					<View style={STYLES.profileDatePickerContainer}>
						<Text style={STYLES.profileEditLabel}>
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

					{ profileAdditionalKeys.map((key) => (
						<FormTextInput 
							key={key}
							label={`${key}`} 
							onChangeText={(text) => {
								setProfileEditInput({
									...profileEditInput,
									[key]: text,
								})
							}}
							defaultValue={profileEditInput?.[key]}
							column={false}
							placeholder="Optional"
						/>
						))
					}

					{ customKeys.map((key) => (
						<FormTextInput 
							key={key}
							label={`${key}`} 
							onChangeText={(text) => {
								setProfileEditInput({
									...profileEditInput,
									[key]: text,
								})
							}}
							defaultValue={profileEditInput?.[key]}
							column={false}
							placeholder="Optional"
							removable={true}
							onPressRemove={() => removeCustomInfo(key)}
						/>
						))
					}

					<View style={STYLES.profileEditNewInfoContainer}>
						<TextInput 
							style={STYLES.profileEditNewInfoKeyInput}
							onChangeText={(text) => {
								setCustomKey(text)
							}}
							defaultValue={customKey}
							column={false}
							placeholder="New Info Type"
						/>

						<View style={STYLES.profileEditNewInfoValueContainer}>
							<TextInput 
								style={STYLES.profileEditNewInfoValueInput}
								onChangeText={(text) => {
									setCustomValue(text)
								}}
								defaultValue={customValue}
								column={false}
								placeholder="Enter New Info"
							/>

							<Pressable style={STYLES.buttonAddProfileInput} onPress={addCustomInfo}>
								<AntDesign name="pluscircle" size={20} />
							</Pressable>
						</View>
					</View>

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
		padding: 8,
	},
	profileDetailInfo: {
		justifyContent: "center",
		alignItems: 'center',
		padding: 8,
		width: "100%",
		marginBottom: 80,
	},
	profileModal: {
		borderRadius: 20,
		backgroundColor: COLORS.BACKGROUNDGRAY,
		margin: 20, 
		flex: 1,
	},
	profileModalContainer: {
		justifyContent: "center",
		alignItems: 'center',
		padding: 8,
		width: "100%",
		borderBottomEndRadius: 20,
	},
	profileImage: {
		aspectRatio: 1,
		width: "75%",
		marginTop: 80,
		marginBottom: 30,
	},
	profileDatePicker: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		width: "100%",
	},
	profileTextContainer: {
		width: "100%",
		borderBottomColor: COLORS.BASEGRAY,
		borderBottomWidth: 1,
		fontSize: 24,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 8,
	},
	profileDatePickerContainer: {
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.BASEGRAY,
		padding: 8,
	},
	profileLabel: {
		fontWeight: "bold",
		fontSize: 24,
		width: "50%",
		textTransform: 'capitalize',
	},
	profileEditLabel: {
		fontWeight: "bold",
		fontSize: 20,
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
	profileEditNewInfoContainer: {
		display: "flex",
		flexDirection: "row",
		padding: 6,
	},
	profileEditNewInfoKeyInput: {
		fontSize: 20,
		width: "50%",
		overflow: "scroll",
		backgroundColor: "white",
		paddingVertical: 0,
		marginVertical: 10,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
		marginLeft: -5,
		marginRight: 5,
	},
	profileEditNewInfoValueContainer: {
		width: "50%",
		display: "flex",
		flexDirection: "row",
	},
	profileEditNewInfoValueInput: {
		fontSize: 20,
		width: "85%",
		overflow: "scroll",
		backgroundColor: "white",
		paddingVertical: 0,
		marginVertical: 10,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
	},
	buttonAddProfileInput: {
		alignSelf: "center",
		marginLeft: 5,
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