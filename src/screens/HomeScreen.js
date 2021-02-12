import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";

export default ({ history}) => (
    <View>
        <Text> This is Home page</Text>
        <Button title = "User Profile" onPress = {() => history.push("/data")}/>
        <Button title = "Quiz" onPress = {() => history.push("/quiz")}/>
    </View>
);