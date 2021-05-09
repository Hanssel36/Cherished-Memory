import React, {useState, useEffect, useContext} from 'react';
import { Text, StyleSheet, View, Dimensions, Pressable, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Tooltip from 'react-native-walkthrough-tooltip';
import { UserContext } from "../utils/fontGlobal";
import { COLORS } from '../styles';

const quizScreen = ({ history}) => {

    const [allProfiles, setAllProfiles] = useState([]);
    const [blockGame, setBlockGame] = useState(false);
    const {step3, setStep3} = useContext(UserContext);

    const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('profiles');
			setAllProfiles(jsonValue ? JSON.parse(jsonValue) : []);
		} catch (e) {
			console.error(e);
			// read error
		}
	}

  useEffect(()=> {
		// AsyncStorage.clear();
		getData();
	}, [])

    // console.log(allProfiles.length);
	function checkNumOfProfiles(){
			if(allProfiles.length < 4){
					setBlockGame(true);
			}else{
					history.push("/memorycard");
			}
	}

	function matchingButton(){
		setStep3(false);
	}

	return(
    <View style = {STYLES.container}>
			<Modal animationType="slide" transparent={true} visible={blockGame}>
				<View style={STYLES.centeredView}>
						<View style={STYLES.modalView}>
							<Text style={STYLES.modalText}>
								Please have at least 4 profiles to play matching card game
							</Text>
							<Pressable
								style={STYLES.buttonModal}
								onPress={() => history.push("/data")}
							>
								<Text style={STYLES.modalText}>Go to Profiles</Text>
							</Pressable>
						</View>
				</View>
			</Modal>

				<Pressable style={STYLES.buttonBack} onPress={() => history.push("/")}>
						<AntDesign name="arrowleft" size={50} color="black" />
						<Text style={STYLES.buttonBackText}>
							Go Back
						</Text>
					</Pressable>

        <View style = {STYLES.icon}>
					<Image source = {require('../assets/images/puzzle_1.png')}/>
        </View>

        <View>
					<View style = {STYLES.alternativeLayoutButtonContainer}>

					<Tooltip
						isVisible={step3}
						content={<Text style = {STYLES.text}>Press to play matching card game!</Text>}
						placement="top"
						onClose={matchingButton}
					>
						<Pressable style = {STYLES.buttonMemoryGame} onPress = {checkNumOfProfiles}>
							<Text style = {STYLES.text} >Memory Game</Text>
						</Pressable>
					</Tooltip>
						<Pressable style = {STYLES.buttonMultipleChoice}  onPress = {() => history.push("/multiplechoice")}>
							<Text style = {STYLES.text} >Multiple Choice</Text>
						</Pressable>

					</View>
            
        </View>
    </View>
  );
}

const STYLES = StyleSheet.create({
	container: {
		backgroundColor: COLORS.BACKGROUNDBLUE,
		justifyContent: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		alignItems: 'center',
	},
	buttonMemoryGame: {
		backgroundColor: COLORS.BASEPURPLE,
		padding: 30,
		borderRadius: 30,
		marginVertical: 50,
		minWidth: 350,
		width: "80%",
	},
	buttonMultipleChoice: {
		backgroundColor: COLORS.BASEBLUE,
		padding: 30,
		borderRadius: 30,
		marginVertical: 50,
		width: "80%",
		minWidth: 350,
	},
	text:{
		fontSize: 26,
		textAlign: 'center'  
	},
	icon:{
			alignItems: 'center'
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 22
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
	buttonBack: {
		position: "absolute",
		top: 0,
		left: 0,
		flex: 1,
		flexDirection: "row",
		alignItems: 'center',
	},
	buttonBackText: {
		fontSize: 24,
	},
	buttonModal: {
		borderRadius: 20,
		padding: 10,
		elevation: 1,
		marginTop: 10,
		backgroundColor: COLORS.BASEGREEN,
	},
	modalText: {
		textAlign: "center",
		fontSize: 18,
	},
});

export default quizScreen;