import React, { Component } from 'react';
import { Button,Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import styles from '../styles/MyStyle';

// This is Memory card quiz game.
// Create logic for memory game

const Memory = ({ history}) =>{

  numOfCards = 8;
  let val = 0;
  let aniVal = []
  let boardlock = false;

  for(let i = 0; i < numOfCards; i++){
    aniVal.push(new Animated.Value(0))

  }

    
  let faceCard = [
  {image:require('../images/old-people-senior-man-grandfather-grandparent-mature-person-cartoon-character_24640-61818.jpg')},
  {image:require('../images/football-no-background.png')},
  {image:require('../images/004Charmander.webp')},
  {image:require('../images/old-people-senior-man-grandfather-grandparent-mature-person-cartoon-character_24640-61810.jpg')}
  ]

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

    if(cardIsFlipped == true){
      // The first card is flipped so now the second card will be checked.
      if(cardIsFlipped && (cardId == firstId)){
          return;
      }
      console.log("here")
      if(firstFlip == cardType){
        // flips to its frontface
        Animated.spring(aniVal[cardId],{
          toValue: 180,
          friction: 8,
          tension: 10,
          useNativeDriver: true,   
        }).start();
        val = 90;

        itsAMatch.add(firstFlip);
        cardIsFlipped = false;

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
  for (let index = 0, shuffle = 0; index < numOfCards, shuffle < numOfCards; index++, shuffle++) {
    
      cards.push(
        <TouchableOpacity activeOpacity = {1.0} key = {index} onPress = {() => flipCard(shuffle%faceCard.length,index)}>
          <Animated.Image key = {index} source= {faceCard[shuffle%faceCard.length].image} style = {[styles.backfacecard , backCardAni[index]]} />
          <Animated.View style = {[styles.memGameCard, frontCardAni[index]]}/>  
        </TouchableOpacity>
      )

  }

  return(
  <View >
      <View>
        <Button title = "Back"  onPress = {() => history.push("/quiz")}/>
      </View>

      <Text> This is a Memory card game</Text>
      
      <View style = {styles.container}>
        
      {cards}

      </View>
  </View>
  );
}

export default Memory;