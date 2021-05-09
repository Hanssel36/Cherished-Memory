import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Image, Text, Pressable, View, StyleSheet, Dimensions, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthInput from "./AuthInput";
import {useGlobal} from "../../context/GlobalContext";
import {validateForm} from "../../utils/helper";
import { COLORS } from '../../styles';

export default function Login({history}) {
	const [input, setInput] = useState({
		email: "",
		password: "",
	})
	const [loading, setLoading] = useState(false);
	const [global, dispatch] = useGlobal();

	const onFooterLinkPress = () => {
		history.push('/register')
	}

	const onAuthStateChanged = (newUser) => {
		dispatch({
			type: "changeUser",
			newUser,
		});
		if (loading) setLoading(false);
	}

	const onLoginPress = () => {
		if (!validateForm(input)) {
			Alert.alert("Please fill out all the fields");
			return;
		}
		setLoading(true);

		try {
			auth()
				.signInWithEmailAndPassword(input.email, input.password)
				.then((response) => {
					console.log('User account signed in');
					const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
					// console.log("response", response)
					const usersCollection = firestore()
						.collection('Users')
						.doc(response.uid);
					console.log("usersCollection", usersCollection);

					history.push('/');
					return subscriber;
				})
				.catch(error => {  
					if (error.code === 'auth/invalid-email') {
					Alert.alert('Invalid Login. Please check your email and/or password.');
				}
				console.error(error);
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={STYLES.container}>
			<KeyboardAwareScrollView
			style={{ flex: 1, width: '100%'}}
			keyboardShouldPersistTaps="always">
				<View style = {{flexDirection: 'row'}}>
					<Pressable style={STYLES.buttonBack} onPress = {() => history.push("/")}>
						<AntDesign name="arrowleft" size={50} color="black" />
						<Text style = {STYLES.buttonBackText}>Go Back</Text>
					</Pressable>
				</View>
				<Image
					style={STYLES.logo}
					source={require('../../assets/images/Logo.png')}
				/>

				<View style={STYLES.inputContainer}>
					<AuthInput
						label="Email"
						onChangeText={(text) => setInput({
							...input, 
							email: text
						})}
						value={input.email}
					/>
					<AuthInput
						// placeholderTextColor="#aaaaaa"
						label="Password"
						secureTextEntry
						onChangeText={(text) => setInput({
							...input, 
							password: text
						})}
						value={input.password}
						// underlineColorAndroid="transparent"
					/>
				</View>
				
				<Pressable
					style={STYLES.button}
					onPress={onLoginPress}
					disabled={loading}
				>
					<Text style={STYLES.buttonTitle}>Log in</Text>
				</Pressable>
				
				<View style={STYLES.footerView}>
					<Text style={STYLES.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={STYLES.footerLink}>Sign up</Text></Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	)
}

const STYLES = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: COLORS.BACKGROUNDGRAY,
		minHeight: Dimensions.get('window').height, 
	},
	inputContainer: {
		paddingHorizontal: 20 
	},
	logo: {
		alignSelf: "center",
		marginTop: 40,
		marginBottom: 30,
		alignItems: 'center',
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
	button: {
		backgroundColor: COLORS.BASEGREEN,
		width: "80%",
		maxWidth: 350,
		borderRadius: 50,
		padding: 5,
		alignItems: "center",
		justifyContent: 'center',
		alignSelf: "center",
		marginTop: 20,
	},
	buttonTitle: {
		color: 'black',
		fontSize: 30,
		fontWeight: "bold"
	},
	footerView: {
		flex: 1,
		alignItems: "center",
		marginTop: 20
	},
	footerText: {
		fontSize: 18,
		color: '#2e2e2d'
	},
	footerLink: {
		color: COLORS.BASEPURPLE,
		fontWeight: "bold",
		fontSize: 18
	}
});