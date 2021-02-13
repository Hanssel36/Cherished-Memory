import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";

export default ({ history}) => (
    <View>
        <View>
            <Button title = "Back"  onPress = {() => history.push("/")}/>
        </View>
        <Text> This is Quiz page</Text>
    </View>
);