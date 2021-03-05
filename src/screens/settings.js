import React, { useState } from "react";
import { Button, Text, StyleSheet, View, Switch } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";


const Settings = ({history}) =>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    return(
        <View style = {Settingstyles.container}>
            <View>
                <Button title = "Go Back"  onPress = {() => history.push("/")}/>
            </View>

            <View style = {Settingstyles.switchlayout}>
                <Text style = {Settingstyles.text} >Caregiver Mode</Text>

                <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            </View>

            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Font: default</Text>
            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Change pin</Text>
            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Reset Database</Text>
            <View style = {Settingstyles.section}/>

        </View>

    );
}
const Settingstyles = StyleSheet.create({
    container: {
        paddingVertical: 1

    },
    switchlayout: {
        flexDirection: 'row'
    },

    text:{
        fontSize: 26,
        textAlign: 'left'  
    },
    section: {
        flexDirection: 'column',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 1
    }
});

export default Settings;