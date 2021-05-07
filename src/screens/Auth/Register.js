import React, { useState } from 'react'
import { Image, Text, TextInput, Pressable, View, StyleSheet, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useGlobal} from "../../context/GlobalContext";
import {Checkbox} from "../../components/Checkbox";
import { COLORS } from '../../styles';

const Register = ({history}) => {
    const [input, setInput] = useState({
        fullName: "", 
        email: "",
        password: "",
        confirmPassword: "",
        // userType: ""
    })

    const [loading, setLoading] = useState(false);
    const [global, dispatch] = useGlobal();

    const onFooterLinkPress = () => {
        history.push('/login');
    }

    const onAuthStateChanged = (newUser) => {
        dispatch({
            type: "changeUser",
            newUser,
        });
        if (loading) setLoading(false);
    }

    const onRegisterPress = () => {
        if (input.password !== input.confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        setLoading(true);

        auth()
        .createUserWithEmailAndPassword(input.email, input.password)
        .then((response) => {
            console.log('User account created and signed in');
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
            console.log(response)
            const usersCollection = firestore()
            .collection('Users')
            .doc(response.uid);
            console.log(usersCollection);
            history.push('/');
            return subscriber;
          })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('This email address is already used by an existing account. Please log in instead.');
            }
        
            if (error.code === 'auth/invalid-email') {
                console.log('This email address is invalid.');
            }
        
            console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image 
                    style={styles.logo}
                    source = {require('../../assets/images/Logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setInput({
                        ...input, 
                        fullName: text
                    })}
                    value={input.fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setInput({
                        ...input, 
                        email: text
                    })}
                    value={input.email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setInput({
                        ...input, 
                        password: text
                    })}
                    value={input.password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setInput({
                        ...input, 
                        confirmPassword: text
                    })}
                    value={input.confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Pressable
                    style={styles.button}
                    onPress={onRegisterPress}
                    disabled={loading}
                >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </Pressable>
                {/* <Checkbox
                   onPress={onUserTypePress}
                /> */}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUNDGRAY,
        minHeight: Dimensions.get('window').height,
    },
    logo: {
        flex: 1,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default Register;