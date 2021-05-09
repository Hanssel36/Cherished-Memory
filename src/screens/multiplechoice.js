import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeRouter, Route, Link } from "react-router-native";
import styles from '../styles/MyStyle';
import { BACKGROUNDBLUE, BACKGROUNDPURPLE, BASEBLUE, BASEPURPLE } from '../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from './profilehelp';


export default function App( {history} ) {

	const [allProfiles, setAllProfiles] = useState([]);
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
	}
	
		const displayFullProfile = () => {
			setDisplayOpen(true);
		}
	


	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('profiles');
			let user = await AsyncStorage.getItem('name');
			setAllProfiles(jsonValue ? JSON.parse(jsonValue) : []);
		} catch (e) {
			console.error(e)
			// read error
		}
	}

	const [modifiedDataToggle, setModifiedDataToggle] = useState(false);

	useEffect(()=> {
		// AsyncStorage.clear();
		getData();
	}, [modifiedDataToggle])


	//declaring modals used for feedback after question's are answered
	const [modalVisible, setModalVisible] = useState(false);
	const [modal2Visible, setModal2Visible] = useState(false);

	//TESTING STUFF
	//console.log("This is number of profiles",allProfiles.length);
	//console.log("Person selected was", selected);
	//console.log(allProfiles.findIndex(obj => obj.name == selected));
	//const index = allProfiles.findIndex(obj => obj.name == selected);
	//console.log("SELECTED INDEX = ", indes);
	//console.log(allProfiles[index])

/// RANDOM NUMBER GEN	console.log("RANDOM NUMNER", Math.floor(Math.random()* 5));

	const potnames = ["James", "Peter", "Jeff", "Kyle", "Emma", "Jessica", "Bonnie", "Chris", "Hanssel", "Florence"]
	let nameset = new Set();
	while(nameset.size != 3){
		let j = Math.floor(Math.random() * (potnames.length-1));
		console.log(j);
		nameset.add(potnames[j]);
	}
	nameset = Array.from(nameset)
	console.log(nameset[0])

	const potrelations = ["Daughter", "Aunt", "Mother", "Grandmother", "Cousin", "Uncle", "Father","Son", "Nephew", "Niece", "Grandfather"]
	let relationset = new Set();
	while (relationset.size !=3){
		let j = Math.floor(Math.random() * (potrelations.length-1));
		console.log(j);
		if(potrelations[j] != selectedrelationship){
		relationset.add(potrelations[j]);
		}
	}
	relationset = Array.from(relationset);
	
	
	//array that contains questions currently only hardcoded questions will randomize later
	//console.log(allProfiles[1]?.name)
	const questions = [
		{
			questionText: 'What is this person\'s name?',
			answerOptions: [
				{ answerText: selectedname, isCorrect: true },
				{ answerText: nameset[0], isCorrect: false },
				{ answerText: nameset[1], isCorrect: false },
				{ answerText: nameset[2], isCorrect: false },
			],
		},
		{
			questionText: "When  is their birthday?",
			answerOptions: [
				{ answerText: selecteddob, isCorrect: true },
				{ answerText: 'Pepsi', isCorrect: false },
				{ answerText: 'Green Tea', isCorrect: false },
				{ answerText: 'Coffee', isCorrect: false },
			],
		},
		{
			questionText: 'What is their relationship to you?',
			answerOptions: [
				{ answerText: relationset[0], isCorrect: false },
				{ answerText: relationset[1], isCorrect: false },
				{ answerText: selectedrelationship, isCorrect: true },
				{ answerText: relationset[2], isCorrect: false },
			],
		},
		/*{
			questionText: 'How many dogs do they have?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '2', isCorrect: true },
			],
		},*/
	];

	
		//questions.sort(() => Math.random() -0.5);
		for (let i = 0; i < questions.length; i++){
			questions[i].answerOptions.sort(() => Math.random() -0.5);
		}

	//declaring vars used for quiz scoring will fully implement later
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0)

	const handleAnswerOption = (isCorrect) => {
		if (isCorrect){
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length){
			setCurrentQuestion(nextQuestion);
		} else{
			setShowScore(true);
		}
	};


	return (

	<View style = {Quizstyles.container}>
        <View style = {{flexDirection: 'row'}}>
            <Pressable onPress = {() => history.push("/")}>
                <AntDesign name="arrowleft" size={50} color="black" />
            </Pressable>
            <Text style = {styles.backButtonText}>Go Back</Text>
        </View>
		<View style = {Quizstyles.space}/>
		<Text style = {Quizstyles.QuestionText} >Question {currentQuestion + 1} </Text>
		<View >
			<Text style = {Quizstyles.QuestionText}> {questions[currentQuestion].questionText}</Text>
        </View>
		

		<View style = {Quizstyles.space}/>
		
		
		
		<Modal animationType = "none"  // modal for correct answer
			transparent ={true}
			visible ={modalVisible}
			onRequestClose = {() => {Alert.alert("Modal1 closed");
			setModalVisible(!modalVisible)
			}}>
			<View style = {Quizstyles.centeredView}>
				<View style = {Quizstyles.modalView}>
					<Text style = {Quizstyles.modalText}> Correct! </Text>
					<Pressable
						style = {[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible(!modalVisible)}
						>
							<Text>Ok</Text>
					</Pressable>
				</View>
			</View>
		</Modal>

		<Modal animationType = "none" // modal for wrong answer
			transparent ={true}
			visible ={modal2Visible}
			onRequestClose = {() => {Alert.alert("Modal2 closed");
			setModal2Visible(!modal2Visible)
			}}>
			<View style = {Quizstyles.centeredView}>
				<View style = {Quizstyles.modalView}>
					<Text style = {Quizstyles.modalText}> Incorrect! </Text>
					<Pressable
						style = {[styles.button, styles.buttonClose]}
						onPress={() => setModal2Visible(!modal2Visible)}
						>
							<Text>Ok</Text>
					</Pressable>
				</View>
			</View>
		</Modal>



		<View>

			<Pressable style = {Quizstyles.QuizButton} onPress = //button for first question choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz. Go back to take another quiz.") : 
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[0].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[0].answerText}</Text> 
			</Pressable>
			
			<View style={Quizstyles.space}/>

			<Pressable style = {Quizstyles.QuizButton} onPress = //button for second choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz. Go back to take another quiz.") :
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[1].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[1].answerText}</Text>
			</Pressable>	
			
			<View style = {Quizstyles.space}/>

			<Pressable style = {Quizstyles.QuizButton} onPress = //third choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz. Go back to take another quiz.") :
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[2].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[2].answerText}</Text>
			</Pressable>	
			
			<View style = {Quizstyles.space}/>
			
			<Pressable style = {Quizstyles.QuizButton} onPress = //fourth choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz. Go back to take another quiz.") :
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[3].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[3].answerText}</Text>
			</Pressable>	
			
			<View style = {Quizstyles.space}/>

		</View>
    </View>
	)
};

const Quizstyles = StyleSheet.create({
    container: { // format containing background
        backgroundColor: BACKGROUNDBLUE,
		//justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    
	QuizButton: { // format quiz buttons
        backgroundColor: BACKGROUNDPURPLE,
        padding: 5,
        borderRadius: 90,
        marginVertical: 10,
		width: 250,
		height : 50,
		alignSelf : 'center'
    },
    
	QuestionText:{ //format questions text
        fontSize: 26,
        textAlign: 'center',
		backgroundColor : "#rgba(250,250,250,0.5)"
    },
	
	space:{ //format spaces inbetween
		height: 30,
	
	},
	
	Choices:{ // format choice text
		fontSize: 24,
		textAlign: 'center'
	},
	
	centeredView: { // modal formating
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	  },
	
	  modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
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
		borderRadius: 20,
		padding: 10,
		elevation: 2
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
		marginBottom: 15,
		textAlign: "center"
	  }
		

});