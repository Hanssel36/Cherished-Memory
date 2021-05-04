import React, { Component, useState, useEffect } from 'react';
import { Button,Text, View, TouchableOpacity, Animated, StyleSheet, Dimensions, Pressable, Modal, Image } from 'react-native';
import { BACKGROUNDBLUE, BACKGROUNDGREEN } from '../styles/colors';
import styles from '../styles/MyStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Profile from './Data/profile';

// This is Memory card quiz game.
// Create logic for memory game

const Memory = ({ history}) =>{
/*
  <Modal  animationType="slide"
  transparent={false}
  visible={profileLimit}
  >
<View style={memStyles.centeredView}>
<View style={memStyles.modalView}>

<Text style={memStyles.modalText}>Please have at least 4 profiles to play matching card game</Text>
<Pressable
style={[memStyles.button, memStyles.buttonClose]}
onPress={() => history.push("/data")}
>
<Text style={memStyles.modalText}>Go to data screen</Text>
</Pressable>
</View>
</View>
</Modal>
*/
  const [allProfiles, setAllProfiles] = useState([]);
  const [modifiedDataToggle, setModifiedDataToggle] = useState(false);
  const [winGame, setWinGame] = useState(false);
    
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
	}, [modifiedDataToggle])

  let numOfCards = 8;
  let aniVal = []
  let boardlock = false;

  // https://javascript.info/task/shuffle used from here
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  for(let i = 0; i < numOfCards; i++){
    aniVal.push(new Animated.Value(0))

  }

  let tempSet = new Set();
  
  
  while (tempSet.size != 4) {
      
      let j = Math.floor(Math.random() * 4);
      tempSet.add(j);
  }

  console.log(tempSet);
  tempSet = Array.from(tempSet);
  let faceCard = [];
  for(let i = 0; i < tempSet.length; i++){
    faceCard.push({image: allProfiles[tempSet[i]]?.media});
    
  }

  /*
  let faceCard = [
    ,
    {image: allProfiles[1]?.media},
    {image: allProfiles[2]?.media},
    {image: allProfiles[3]?.media}
  ]
  */

  /*
  let faceCard = [
  {image:require('../assets/images/Image_1.png')},
  {image:require('../assets/images/Image_2.png')},
  {image:require('../assets/images/Image_3.png')},
  {image:require('../assets/images/Image_4.png')}
  ]
    */

  for( let i = 0; i < numOfCards/2; i++){
    faceCard.push(faceCard[i])
  }

  let frontCardAni = []
  let backCardAni = []
  

  for(let i = 0; i < numOfCards; i++){
    frontCardAni.push({transform: [{ rotateY: aniVal[i].interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],})}]})

      backCardAni.push({transform: [{ rotateY: aniVal[i].interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],}) }] })
  }

  let cardIsFlipped = false;
  let itsAMatch = new Set();
  let firstFlip;
  let firstId;

  const flipCard = (cardType, cardId) => {
    
    if(boardlock) {return;}

    // Will Not allow user to do anything with flipped cards.
    if(itsAMatch.has(cardType)){return;}

    if(cardIsFlipped == true){
      // The first card is flipped so now the second card will be checked.
      if(cardIsFlipped && (cardId == firstId)){
          return;
      }

      //console.log(allProfiles.length)

      if(firstFlip == cardType){
        // flips to its frontface
        Animated.spring(aniVal[cardId],{
          toValue: 180,
          friction: 8,
          tension: 10,
          useNativeDriver: true,   
        }).start();

        itsAMatch.add(firstFlip);
        cardIsFlipped = false;
        if(itsAMatch.size == 4){
          setWinGame(true);
        }

      }else{

        boardlock = true;
        // will flip the second card to its front
        Animated.spring(aniVal[cardId],{
          toValue: 180,
          friction: 8,
          tension: 10,
          useNativeDriver: true,   
        }).start();
      
        setTimeout(() => {
          
        Animated.spring(aniVal[firstId],{
          toValue: 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start();

        Animated.spring(aniVal[cardId],{
          toValue: 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start();
        
        boardlock = false;
      }, 1500);


      cardIsFlipped = false;

    }
  }else{
      // flip to its front
      Animated.spring(aniVal[cardId],{
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,   
      }).start();

      firstFlip = cardType;
      firstId = cardId;

      cardIsFlipped = true;
      console.log(itsAMatch);

    }
  }





  let cards = []
  //let logo = require('../assets/images/Logo.png')
 shuffleArray(faceCard);
  for (let index = 0, shuffle = 0; index < numOfCards, shuffle < numOfCards; index++, shuffle++) {
    
      cards.push(
        <TouchableOpacity activeOpacity = {1.0} key = {index} onPress = {() => flipCard(faceCard[index],index)}>
          <Animated.Image  key = {index} source= {faceCard[shuffle%faceCard.length].image} style = {[styles.backfacecard , backCardAni[index]]} />
          <Animated.View style = {[styles.memGameCard, frontCardAni[index]]}/>  
        </TouchableOpacity>
      )

  }

  function playAgain(){
    setWinGame(false);
    history.push("/memorycard");
  }

  return(
  <View style = {memStyles.container}>

    <View style = {{flexDirection: 'row'}}>
        <Pressable onPress = {() => history.push("/quiz")}>
            <AntDesign name="arrowleft" size={50} color="black" />
        </Pressable>
        <Text style = {styles.backButtonText}>Go Back</Text>
    </View>

    <View style = {memStyles.icon}>
      <Image source = {require('../assets/images/puzzle_1.png')}/>
    </View>
      
      <View style = {styles.container}>      
      {cards}
      </View>

      <Modal  animationType="slide"
      transparent={true}
      visible={winGame}
      >
        <View style={memStyles.centeredView}>
            <View style={memStyles.modalView}>

              <Text style={memStyles.modalText}>You Win!</Text>
              <Pressable
              style={[memStyles.button, memStyles.buttonClose]}
              onPress={() => playAgain()}
              >
              <Text style={memStyles.modalText}>Play again!</Text>
              </Pressable>
            </View>
        </View>
    </Modal>

  </View>
  );
}

const memStyles = StyleSheet.create({

  container: {
    backgroundColor: BACKGROUNDBLUE,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  centeredView: {
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
  modalText: {
    textAlign: "center",
  },    
  icon:{
    alignItems: 'center'
  },

});

export default Memory;