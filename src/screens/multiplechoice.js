import React, {useState} from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Pressable, Modal } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";
import styles from '../styles/MyStyle';
import { BACKGROUNDBLUE, BACKGROUNDPURPLE, BASEBLUE, BASEPURPLE } from '../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function App( {history} ) {

	//declaring modals used for feedback after question's are answered
	const [modalVisible, setModalVisible] = useState(false);
	const [modal2Visible, setModal2Visible] = useState(false);
	
	
	//array that contains questions currently only hardcoded questions will randomize later
	const questions = [
		{
			questionText: 'What is Sandra\'s last name?',
			answerOptions: [
				{ answerText: 'Smith', isCorrect: true },
				{ answerText: 'Gretle', isCorrect: false },
				{ answerText: 'Robinson', isCorrect: false },
				{ answerText: 'Johnson', isCorrect: false },
			],
		},
		{
			questionText: 'What is Sandra\'s favorite drink?',
			answerOptions: [
				{ answerText: 'Water', isCorrect: true },
				{ answerText: 'Pepsi', isCorrect: false },
				{ answerText: 'Green Tea', isCorrect: false },
				{ answerText: 'Coffee', isCorrect: false },
			],
		},
		{
			questionText: 'Where did Sandra go to school?',
			answerOptions: [
				{ answerText: 'Harvard', isCorrect: false },
				{ answerText: 'Yale', isCorrect: false },
				{ answerText: 'CCNY', isCorrect: true },
				{ answerText: 'Stanford', isCorrect: false },
			],
		},
		{
			questionText: 'How many dogs does Sandra have?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '2', isCorrect: true },
			],
		},
	];

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
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") : 
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[0].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[0].answerText}</Text> 
			</Pressable>
			
			<View style={Quizstyles.space}/>

			<Pressable style = {Quizstyles.QuizButton} onPress = //button for second choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") :
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[1].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[1].answerText}</Text>
			</Pressable>	
			
			<View style = {Quizstyles.space}/>

			<Pressable style = {Quizstyles.QuizButton} onPress = //third choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") :
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[2].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[2].answerText}</Text>
			</Pressable>	
			
			<View style = {Quizstyles.space}/>
			
			<Pressable style = {Quizstyles.QuizButton} onPress = //fourth choice
			{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") :
			setCurrentQuestion(currentQuestion + 1); {questions[currentQuestion].answerOptions[3].isCorrect ? setModalVisible(true) : setModal2Visible(true);}}}>
				<Text style = {Quizstyles.Choices}> {questions[currentQuestion].answerOptions[3].answerText}</Text>
			</Pressable>	
			
			<View style = {Quizstyles.space}/>

		</View>

		<Text> {currentQuestion}</Text>		        
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