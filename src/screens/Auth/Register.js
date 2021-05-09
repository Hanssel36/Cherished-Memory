import React, { useState } from 'react'
import { Image, Text, Pressable, View, StyleSheet, Dimensions, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {useGlobal} from "../../context/GlobalContext";
import {Checkbox} from "../../components/Checkbox";
import AuthInput from "./AuthInput";
import {validateForm} from "../../utils/helper";
import { COLORS } from '../../styles';

const Register = ({history}) => {
	const [input, setInput] = useState({
		fullName: "", 
		email: "",
		password: "",
		confirmPassword: "",
		// userType: ""
	})

	const [loading, setLoading] = useState(false);
	const [global, dispatch] = useGlobal();

	const onFooterLinkPress = () => {
		history.push('/login');
	}

	const onAuthStateChanged = (newUser) => {
		dispatch({
			type: "changeUser",
			newUser,
		});
		if (loading) setLoading(false);
	}

	const onRegisterPress = () => {
		if (!validateForm(input)) {
			Alert.alert("Please fill out all the fields");
			return;
		}
		else if (input.password !== input.confirmPassword) {
			Alert.alert("Passwords don't match.")
			return;
		}
		
		setLoading(true);

		try {
			auth()
			.createUserWithEmailAndPassword(input.email, input.password)
			.then((response) => {
					console.log('User account created and signed in');
					const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
					console.log(response)
					const usersCollection = firestore()
						.collection('Users')
						.doc(response.uid)
						.set({
							allProfiles: [],
						})
						.then(()=> {
							console.log("User allProfiles init")
						})
					console.log(usersCollection);
					history.push('/');
					return subscriber;
				})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('This email address is already used by an existing account. Please log in instead.');
				}
		
				if (error.code === 'auth/invalid-email') {
					console.log('This email address is invalid.');
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
				keyboardShouldPersistTaps="always"
			>
				<View style = {{flexDirection: 'row'}}>
					<Pressable style={STYLES.buttonBack} onPress = {() => history.push("/")}>
						<AntDesign name="arrowleft" size={50} color="black" />
						<Text style = {STYLES.buttonBackText}>Go Back</Text>
					</Pressable>
				</View>
				<Image 
						style={STYLES.logo}
						source = {require('../../assets/images/Logo.png')}
				/>

				<View style={STYLES.inputContainer}>	
					<AuthInput
						label='Full Name'
						onChangeText={(text) => setInput({
							...input, 
							fullName: text
						})}
						value={input.fullName}
					/>
					<AuthInput
						label='Email'
						onChangeText={(text) => setInput({
							...input, 
							email: text
						})}
						value={input.email}
					/>
					<AuthInput
						secureTextEntry
						label='Password'
						onChangeText={(text) => setInput({
							...input, 
							password: text
						})}
						value={input.password}
					/>
					<AuthInput
						secureTextEntry
						label='Confirm Password'
						placeholder="Confirm Your Password"
						onChangeText={(text) => setInput({
							...input, 
							confirmPassword: text
						})}
						value={input.confirmPassword}
					/>
				</View>

				<Pressable
					style={STYLES.button}
					onPress={onRegisterPress}
					disabled={loading}
				>
					<Text style={STYLES.buttonTitle}>Create account</Text>
				</Pressable>
				{/* <Checkbox
						onPress={onUserTypePress}
				/> */}
				<View style={STYLES.footerView}>
					<Text style={STYLES.footerText}>Already have an account? <Text onPress={onFooterLinkPress} style={STYLES.footerLink}>Log in</Text></Text>
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
	logo: {
		flex: 1,
		alignSelf: "center",
		marginTop: 40,
		marginBottom: 20,
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
		color: COLORS.BASEBLACK,
		fontSize: 30,
		fontWeight: "bold"
	},
	footerView: {
		flex: 1,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 60
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

export default Register;