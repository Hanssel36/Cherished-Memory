import React, { useState, useContext, useEffect } from "react";
import { Text, StyleSheet, View, Switch, Pressable, Dimensions, Image, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLocation } from "react-router";
import { BACKGROUNDGRAY, BASEBLACK } from "../styles/colors";
import styles from "../styles/MyStyle";
import { UserContext } from "../utils/fontGlobal";

const Settings = ({history}) =>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSizeVisible, setModalSizeVisible] = useState(false);
    
    // global states
    const {myfont,setFont} = useContext(UserContext);
    const {myFontSize, setMyFontSize} = useContext(UserContext);
    const [modifiedDataToggle, setModifiedDataToggle] = useState(false);
    const {step1,setStep1} = useContext(UserContext);

    const [fontSizeName, setFontSizeName] = useState('Regular');

    const STORAGE_KEY = '@save_font';

    // const saveValue = async () => {
    //   try {
    //     await AsyncStorage.setItem(STORAGE_KEY, myfont);
    //   } catch (e) {
    //     console.error(e)
    //     // read error
    //     alert('bad');
    //   }
    // }

    // const getValue = async () => {
    //   try {
    //     const jsonv = await AsyncStorage.getItem(STORAGE_KEY);
    //     if( jsonv !== null){
    //       setFont(jsonv);
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     // read error
    //     alert('faled to get data');
    //   }
    // }

    // useEffect(()=> {
    //   // AsyncStorage.clear();
    //   getValue();
    // }, [])

    
    // const onChangeFont = myfont => setFont(myfont)
    
    function changeFont(fontsetter){
      setModalVisible(false);
      setFont(fontsetter);
    }

    function changeFontSize(size){
      switch(size){
        case 20:
          setFontSizeName("Regular");
          break;
        case 22:
          setFontSizeName("Large");
          break;
        case 26:
          setFontSizeName("Very Large");;
          break;
        default:
          setFontSizeName('');
          break;
      }
      setModalSizeVisible(false);
      setMyFontSize(size);
    }

    function resetTutorial(){
     setStep1(true);
     history.push("/");

    }

    var mystyles = {
      text:{
        fontSize: myFontSize,
        textAlign: 'left',
        paddingHorizontal: 20,
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
          <Text style = {[mystyles.text]} >Caregiver Mode</Text>

          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style = { {marginHorizontal: 0}}
          />
      </View>

      
      <Modal  animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);}}>

        <View style={Settingstyles.centeredView}>
          <View style={Settingstyles.modalView}>

            <Text style={Settingstyles.modalText}>Please choose a font below</Text>
            <View style = {Settingstyles.section}/>

            <Pressable
              style={Settingstyles.text}
              onPress={() => changeFont('Defualt')}
            >
              <Text style={Settingstyles.modalText}>Default</Text>
            </Pressable>
            
            <View style = {Settingstyles.section}/>

            <Pressable style={[Settingstyles.text]} onPress={() => changeFont('Comfortaa-Bold')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Comfortaa-Bold'}]}>Comfortaa-Bold</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>
            <Pressable style={Settingstyles.text} onPress={() => changeFont('Comfortaa-Light')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Comfortaa-Light'}]}>Comfortaa-Light</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>
            <Pressable style={Settingstyles.text} onPress={() => changeFont('Comfortaa-Medium')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Comfortaa-Medium'}]}>Comfortaa-Medium</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>
            <Pressable style={Settingstyles.text} onPress={() => changeFont('Comfortaa-Regular')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Comfortaa-Regular'}]}>Comfortaa-Regular</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>

            <Pressable style={Settingstyles.text} onPress={() => changeFont('Comfortaa-SemiBold')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Comfortaa-SemiBold'}]}>Comfortaa-SemiBold</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>
            <Pressable style={Settingstyles.text} onPress={() => changeFont('Oxygen-Bold')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Oxygen-Bold'}]}>Oxygen-Bold</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>
            <Pressable style={Settingstyles.text} onPress={() => changeFont('Oxygen-Light')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Oxygen-Light'}]}>Oxygen-Light</Text>
            </Pressable>

              <View style = {Settingstyles.section}/>
            <Pressable style={Settingstyles.text} onPress={() => changeFont('Oxygen-Regular')}>
              <Text style={[Settingstyles.modalText, {fontFamily: 'Oxygen-Regular'}]}>Oxygen-Regular</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

      <Modal  animationType="slide"
              transparent={true}
              visible={modalSizeVisible}
              onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalSizeVisible);}}>

        <View style={Settingstyles.centeredSizeView}>
          <View style={Settingstyles.modalSizeView}>
            
          <Pressable style={Settingstyles.text} onPress={() => changeFontSize(20)}>
            <Text style = {Settingstyles.modalText}>Regular</Text>
          </Pressable>
          
          <View style = {Settingstyles.section}/>
          <Pressable style={Settingstyles.text} onPress={() => changeFontSize(22)}>
            <Text style = {Settingstyles.modalText}>Large</Text>
          </Pressable>
          
          <View style = {Settingstyles.section}/>
          <Pressable style={Settingstyles.text} onPress={() => changeFontSize(26)}>
            <Text style = {Settingstyles.modalText}>Very Large</Text>
          </Pressable>


          </View>
        </View>
      </Modal>

      <View style = {Settingstyles.section}/>
      <Pressable style={[styles.button]} onPress={() => setModalVisible(true)}>
        <Text style = {mystyles.text}>Font: {myfont}</Text>
      </Pressable>

      <View style = {Settingstyles.section}/>
      <Text style = {mystyles.text}>Change pin</Text>
      <View style = {Settingstyles.section}/>

      <Pressable style={[styles.button]} onPress={() => setModalSizeVisible(true)}>
        <Text style = {mystyles.text}>Font Size: {fontSizeName}</Text>
      </Pressable>

      <View style = {Settingstyles.section}/>
      <Text style = {mystyles.text}>Account</Text>
      <View style = {Settingstyles.section}/>

      <Pressable onPress={() => resetTutorial()}>
        <Text style = {mystyles.text}>Replay Tutorial</Text>
      </Pressable>

      <View style = {Settingstyles.section}/>            

  </View>

    );


}


var Settingstyles = StyleSheet.create({
    container: {
        paddingVertical: 1,
        backgroundColor: 	"#DCDCDC",
        minHeight: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    switchlayout: {
        flexDirection: 'row'
    },

    text:{
        fontSize: 26,
        textAlign: 'left',
        paddingHorizontal: 20,
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
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 22
      },
      centeredSizeView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 40,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

      modalSizeView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        fontSize: 26,
        textAlign: 'left',
        paddingHorizontal: 0,
      },
      
});

export default Settings;