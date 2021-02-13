import React from 'react';
import { Button,Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";

const Data = ({ history}) =>{
    return(
 
    <View>
        <View>
        <Button title = "Back"  onPress = {() => history.push("/")}/>
        </View>
        <Text> This is User Profile</Text>
    </View>
    );
}

Data.navigationOptions = {
    headerTitle: 'Data',
};

export default Data;