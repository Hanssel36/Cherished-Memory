import React, {useState} from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";
import styles from '../styles/MyStyle';

export default function App( {history} ) {
	const questions = [
		{
			questionText: 'What is Hanssel\'s last name?',
			answerOptions: [
				{ answerText: 'Hinojosa', isCorrect: true },
				{ answerText: 'Gretle', isCorrect: false },
				{ answerText: 'Robinson', isCorrect: false },
				{ answerText: 'Smith', isCorrect: false },
			],
		},
		{
			questionText: 'What is Hanssel\'s favorite drink?',
			answerOptions: [
				{ answerText: 'Water', isCorrect: true },
				{ answerText: 'Pepsi', isCorrect: false },
				{ answerText: 'Green Tea', isCorrect: false },
				{ answerText: 'Coffee', isCorrect: false },
			],
		},
		{
			questionText: 'Where does Hanssel go to school?',
			answerOptions: [
				{ answerText: 'Harvard', isCorrect: false },
				{ answerText: 'Yale', isCorrect: false },
				{ answerText: 'CCNY', isCorrect: true },
				{ answerText: 'Stanford', isCorrect: false },
			],
		},
		{
			questionText: 'How many eyes does Hanssel have?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '2', isCorrect: true },
			],
		},
	];

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
		<View>
        <View>
            <Button title = "Back"  onPress = {() => history.push("/")}/>
        </View>
        <Text>Question {currentQuestion + 1} </Text>
        <View style = {styles.alternativeLayoutButtonContainer}>
        <Text> {questions[currentQuestion].questionText}</Text>
        </View>
		<Button title = {questions[currentQuestion].answerOptions[0].answerText} onPress =
		{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") : 
		setCurrentQuestion(currentQuestion + 1); {alert(questions[currentQuestion].answerOptions[0].isCorrect ? "Its correct" : "Its wrong");}}}/>
		<Button title = {questions[currentQuestion].answerOptions[1].answerText} onPress =
		{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") : 
		setCurrentQuestion(currentQuestion + 1); {alert(questions[currentQuestion].answerOptions[1].isCorrect ? "Its correct" : "Its wrong");}}}/>
		<Button title = {questions[currentQuestion].answerOptions[2].answerText} onPress =
		{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") : 
		setCurrentQuestion(currentQuestion + 1); {alert(questions[currentQuestion].answerOptions[2].isCorrect ? "Its correct" : "Its wrong");}}}/>
		<Button title = {questions[currentQuestion].answerOptions[3].answerText} onPress =
		{() => {currentQuestion == (questions.length - 1) ? alert("You've finished quiz") : 
		setCurrentQuestion(currentQuestion + 1); {alert(questions[currentQuestion].answerOptions[3].isCorrect ? "Its correct" : "Its wrong");}}}/>
		<Text> {currentQuestion}</Text>		        
    </View>
	)
};
