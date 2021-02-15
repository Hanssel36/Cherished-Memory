import React from 'react';
import { Button,Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import styles from '../styles/MyStyle';

// This is Memory card quiz game.
// First step is to create functioning card.

const Memory = ({ history}) =>{
    return(
 
    <View >
        <View>
        <Button title = "Back"  onPress = {() => history.push("/quiz")}/>
        </View>
        <Text> This is Memory card game</Text>
        <View style = {styles.memGameCard}>
            <TouchableOpacity>

            </TouchableOpacity>
            
        </View>
    </View>
    );
}

export default Memory;