import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Modal, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import Form from "./form";
import Profile from "./profile";
import { saveProfiles, getProfiles } from "./helpers";
import {useGlobal} from "../../context/GlobalContext";
import { COLORS } from "../../styles";

const Data = ({ history}) => {
	const newDate = {
		month: new Date().getMonth(),
		date: new Date().getDate(),
		year: new Date().getFullYear(),
	}

	const [{user}, dispatch] = useGlobal();
	
	// states
	const [allProfiles, setAllProfiles] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [newProfile, setNewProfile] = useState({
		name: null,
		relationship: null,
		media: null,
		dob: new Date(newDate.year, newDate.month, newDate.date, 0, 0, 0, 0),
	});
	const [modifiedDataToggle, setModifiedDataToggle] = useState(false);

	// util functions update data
	const saveToFirestore = () => {
		if (!user?.uid) return;
		try {
			const usersCollection = firestore()
			.collection('Users')
			.doc(user.uid)
			.set({
				allProfiles,
			})
			.then(()=> {
				console.log("User allProfiles save")
			});
			return usersCollection;
		} catch (error) {
			console.log(error);
		}
	}

	const addProfile = async () => {
		try {
			// if (validateForm(newProfile)) {
				const newData = [...allProfiles, ...[newProfile]];
				setAllProfiles(newData);
				saveProfiles(newData);
				setNewProfile({
					name: null,
					relationship: null,
					media: null,
					dob: new Date(),
				});
				setModalOpen(false);
				setModifiedDataToggle(!modifiedDataToggle);
			// } else {
			// 	// setErrorMessage(newProfile);
			// }
		} catch (e) {
			console.error(e)
		// saving error
		}
	}

	const removeProfile = (profileIndex) => {
		let remainingProfiles = allProfiles;
		remainingProfiles.splice(profileIndex, 1)
		console.log(remainingProfiles);
		setAllProfiles(remainingProfiles);
		saveProfiles(remainingProfiles);
		setModifiedDataToggle(!modifiedDataToggle);
	}

	const editProfile = (profileIndex, newData) => {
		let updateProfiles = allProfiles;
		updateProfiles.splice(profileIndex, 1, newData);
		// console.log(updateProfiles);
		setAllProfiles(updateProfiles);
		saveProfiles(updateProfiles);
		setModifiedDataToggle(!modifiedDataToggle);
	}

	// useEffect(()=> {
	// 	// AsyncStorage.clear();
	// 	getProfiles();
	// }, [modifiedDataToggle])

	useEffect(()=> {
		user?.uid && saveToFirestore();
		// console.log(allProfiles);
	}, [allProfiles])

	useEffect(()=> {
		getProfiles(setAllProfiles);
	}, []);

	return(
		<View style={STYLES.container}>
        <View style = {{flexDirection: 'row'}}>
            <Pressable style={STYLES.backButton} onPress = {() => history.push("/")}>
                <AntDesign name="arrowleft" size={50} color="black" />
								<Text style = {STYLES.backButtonText}>Go Back</Text>
            </Pressable>
        </View>

		<Modal
			// transparent={true}
			visible={modalOpen}
			onRequestClose={() => {
				setModalOpen(false);
			}}
		> 
			<View style = {{flexDirection: 'row'}}>
				<Pressable style={STYLES.backButton} onPress={() => setModalOpen(false)}>
					<AntDesign name="arrowleft" size={50} color="black" />
					<Text style={STYLES.backButtonText}>Exit</Text>
				</Pressable>
			</View>
			<Form 
				newProfile={newProfile} 
				setNewProfile={setNewProfile} 
				addProfile={addProfile} 
				// closeModal={() => setModalOpen(false)}
			/>
		</Modal>

		<ScrollView contentContainerStyle={STYLES.profileContainer}>
			<View style={STYLES.icon}>
			<Image 
				source = {require('../../assets/images/DataLogo.png')}
			/>
			</View>
			{allProfiles?.length > 0 ?
			<View style={STYLES.displayProfilesContainer}>
				{
					allProfiles.map((profile, index) => (
						<Profile key={`${profile.name}${index}`} profile={profile} removeProfile={()=>removeProfile(index)} editProfile={(newData)=>editProfile(index, newData)} />
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