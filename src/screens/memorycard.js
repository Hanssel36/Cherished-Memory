import React, { Component } from 'react';
import { Button,Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../styles/MyStyle';

// This is Memory card quiz game.
// First step is to create functioning card.

const Memory = ({ history}) =>{



        let test = []
        for (let index = 0; index < 8; index++) {
            test.push(
            <TouchableOpacity key = {index} onPress = {isItTheSame}>
                <Image style = {styles.memGameCard} source=
                    {require('../images/old-people-senior-man-grandfather-grandparent-mature-person-cartoon-character_24640-61818.jpg')}/>
            </TouchableOpacity>   
            )
        }

        const isItTheSame = () =>{
    
            console.log("same")
            
        }

    return(
    <View >
        <View>
        <Button title = "Back"  onPress = {() => history.push("/quiz")}/>
        </View>
        <Text> This is Memory card game</Text>
        <View style = {styles.container}>
            {test}
        </View>
    </View>
    );
}

class card extends Component{
    render() {
        return (
            <View>

            </View>
        )
    }
}
export default Memory;