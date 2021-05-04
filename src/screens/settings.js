import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Switch, Pressable, Dimensions, Image, Modal, Alert } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { BACKGROUNDGRAY } from "../styles/colors";
import styles from "../styles/MyStyle";
import { UserContext } from "../utils/fontGlobal";

const Settings = ({history}) =>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [modalVisible, setModalVisible] = useState(false);
    
    // global states
    const {myfont,setFont} = useContext(UserContext);
    const {myFontSize, setMyFontSize} = useContext(UserContext);
    
    function changeFont(fontsetter){
      setModalVisible(false);
      setFont(fontsetter);
    }

    var mystyles = {
      text:{
        fontSize: 26,
        textAlign: 'left',
        fontFamily : myfont
    }
    };

    return(
        <View style = {Settingstyles.container}>

            <View style = {{flexDirection: 'row'}}>
                <Pressable onPress = {() => history.push("/")}>
                    <AntDesign name="arrowleft" size={50} color="black" />
                </Pressable>
                <Text style = {styles.backButtonText}>Go Back</Text>
            </View>
            <View style = {Settingstyles.iconlayout}>
                <Image style = {Settingstyles.icon} source = {require('../assets/images/settings_icon.png')}/>
            </View>

            <View style = {Settingstyles.section}/>
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

            
            <Modal  animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
        }}>
        <View style={Settingstyles.centeredView}>
          <View style={Settingstyles.modalView}>

            <Text style={Settingstyles.modalText}>Hello World!</Text>

            <Pressable
              style={[Settingstyles.button, Settingstyles.buttonClose]}
              onPress={() => changeFont('defualt')}
            >
              <Text style={Settingstyles.modalText}>Default</Text>
            </Pressable>

            <Pressable
              style={[Settingstyles.button, Settingstyles.buttonClose]}
              onPress={() => changeFont('Comfortaa-Bold')}
            >
              <Text style={Settingstyles.modalText}>Comfortaa-Bold</Text>
            </Pressable>
          </View>
        </View>
            </Modal>

            <View style = {Settingstyles.section}/>
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
            >
                <Text style = {[Settingstyles.text, {fontFamily : myfont}]}>Font: {myfont}</Text>
            </Pressable>
            <View style = {Settingstyles.section}/>
            <Text style = {mystyles.text}>Change pin</Text>
            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Font Size: </Text>
            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Font Color:</Text>
            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Account</Text>
            <View style = {Settingstyles.section}/>
            <Text style = {Settingstyles.text}>Reset Database</Text>
            <View style = {Settingstyles.section}/>            

        </View>

    );


}


var Settingstyles = StyleSheet.create({
    container: {
        paddingVertical: 1,
        backgroundColor: BACKGROUNDGRAY,
        minHeight: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    switchlayout: {
        flexDirection: 'row'
    },

    text:{
        fontSize: 26,
        textAlign: 'left',
        fontFamily : 'default'
    },
    section: {
        flexDirection: 'column',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 1
    },
    icon:{
        alignItems: 'center',
        width: 150,
        height: 150
    },
    iconlayout:{
        alignItems: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      modalText: {
        textAlign: "center",
      },
      
});

export default Settings;