import React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import styles from '../styles/MyStyle';

// Might look into TouchableOpacity instead of Button.

export default ({ history}) => (
    <View >
        <Text> This is Home page</Text>
        <View style = {styles.alternativeLayoutButtonContainer}>
            <Button title = "User Profile"  onPress = {() => history.push("/data")}/>
        </View>

        <View style = {styles.alternativeLayoutButtonContainer} >
            <Button color = "green" title = "Quiz"  onPress = {() => history.push("/quiz")}/>
        </View>
    </View>
);
