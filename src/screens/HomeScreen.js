import React, {useState, useContext} from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import {useGlobal} from "../context/GlobalContext";
import { COLORS } from '../styles';
import Tooltip from 'react-native-walkthrough-tooltip';
import { UserContext } from "../utils/fontGlobal";

// Temporary looks for now. Setting button doesnt do anything yet.

const Home = ({history}) => {
	const [{user}, dispatch] = useGlobal();
	const [toolTipVisible,setToolTipVisible] = useState(true);
	const {step1, step2, step3, setStep1, setStep2, setStep3} = useContext(UserContext);

	function userProfile(){
			setStep1(false);
			setStep2(true);
	}
	function quizButton(){
			setStep2(false);
			setStep3(true);
	}

	const onLogoutPress = () => {
		auth()
		.signOut()
		.then(() => {
			dispatch({
				type: "changeUser",
				newUser: null,
			});
			console.log('User logged out')
		})
		.catch((error) => {
			// An error happened.
			console.log(error)
		});
	}

		
    return(
    
    <View style = {homescreenstyles.container} >

        <Image style={homescreenstyles.icon} source = {require('../assets/images/Logo.png')}/>

        <Tooltip
            isVisible={step1}
            content={<Text style = {homescreenstyles.text}>Press me First to add data</Text>}
            placement="top"
            onClose={() => userProfile()}
            >
            <Pressable style = {homescreenstyles.ProfileButton} onPress = {() => history.push("/data")}>
                <Text style = {homescreenstyles.text} >User Profile</Text>
            </Pressable>
        </Tooltip>
        
        
        <Tooltip
            isVisible={step2}
            content={<Text style = {homescreenstyles.text}>Press me to go to quizzes</Text>}
            placement="top"
            onClose={() => quizButton()}
            >
            <Pressable style = {homescreenstyles.QuizButton} onPress = {() => history.push("/quiz")}>
                <Text style = {homescreenstyles.text} >Quiz</Text>
            </Pressable>
        </Tooltip>

		<Pressable style = {homescreenstyles.SettingsButton} onPress = {() => history.push("/settings")}>
			<Text style = {homescreenstyles.text} >Settings</Text>
		</Pressable>

		{!user ?
		<Pressable style = {homescreenstyles.LoginButton} onPress = {() => history.push("/login")}>
			<Text style = {homescreenstyles.text} >Login</Text>
		</Pressable> 
		:
		<Pressable style = {homescreenstyles.LoginButton} onPress = {onLogoutPress}>
			<Text style = {homescreenstyles.text} >Logout</Text>
		</Pressable> 
		}

		</View>
	)
};

const homescreenstyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BACKGROUNDPURPLE,
		minHeight: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		paddingVertical: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	ProfileButton: {
		backgroundColor: COLORS.BASEGREEN,
		padding: 30,
		borderRadius: 30,
		marginVertical: 30,
		width: "80%",
		minWidth: 350,
	},
	QuizButton: {
		backgroundColor: COLORS.BASEBLUE,
		padding: 30,
		borderRadius: 30,
		marginVertical: 30,
		width: "80%",
		minWidth: 350,
	},
	SettingsButton: {
		backgroundColor: COLORS.BASEGRAY,
		padding: 30,
		borderRadius: 30,
		marginVertical: 30,
		width: "80%",
		minWidth: 350,
	},
	LoginButton: {
		backgroundColor: COLORS.BASEDARKGRAY,
		padding: 30,
		marginVertical: 30,
		borderRadius: 30,
	},
	text: {
		fontSize: 26,
		textAlign: 'center',
		fontFamily: 'default',
	},
	icon:{
		alignItems: 'center'
	}
});

export default Home;

