import React from 'react';
import { Button, Text, StyleSheet, View, Dimensions, Pressable, Image } from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";
import { BACKGROUNDBLUE, BASEBLUE, BASEPURPLE } from '../styles/colors';
import styles from '../styles/MyStyle';

const Settings = ({history}) => (
    <View>
        <View>
            <Button title = "Go Back"  onPress = {() => history.push("/")}/>
        </View>
        <Text>settings</Text>
    </View>
);

export default Settings;