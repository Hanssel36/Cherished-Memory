import React, { useEffect, useState } from 'react';
import { Button, Text, StyleSheet, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from "../../styles"; 
import {FormTextInput, FormImageInput} from "./FormInputs"

const ProfileForm = ({newProfile, setNewProfile, addProfile}) => {
  const steps = ["name", "media", "relationship", "dob", "additional"];
  const pickerItems = ["Favorite Color", "Favorite Food", "Favorite Animal", "School"];

  const [stepsIndex, setStepsIndex] = useState(0);
  const [selectedInputKey, setSelectedInputKey] = useState("Favorite Color"); 
  const [customKey, setCustomKey] = useState(); 
  const [selectedInputValue, setSelectedInputValue] = useState(); 
  const [currentInput, setCurrentInput] = useState();

  const onPressBack = () => {
    if (stepsIndex === 6) {
      setStepsIndex(4);
    }
    else {
      setStepsIndex(stepsIndex-1);
    }
  }

  const onPressNext = () => {
    if (currentInput) {
      if (stepsIndex === 4) {
        return;
      }
      else if (stepsIndex === 7) {
        setNewProfile({
          ...newProfile,
          [selectedInputKey=== "other" ? customKey : selectedInputKey]: selectedInputValue,
        })
        setStepsIndex(4);
      }
      else {
        setStepsIndex(stepsIndex+1);
      }
        // setNewProfile(
        //   {...newProfile, 
        //     [currentStep]: currentInput,
        //   }
        // );
        // setCurrentInput(newProfile[steps[stepsIndex]]);
    }
    else {
      Alert.alert('You did not enter anything');
    }
  }

  useEffect(()=> {
    setCurrentInput(stepsIndex === 7 ? "" : newProfile[steps[stepsIndex]]);
    if (stepsIndex === 6) {
      setCurrentInput("Favorite Color")
    }
  }, [stepsIndex]);

  // useEffect(()=> {
  //   console.log("currentInput:",currentInput);
  // }, [currentInput]);

	return (  
  <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'}}>
    <ScrollView contentContainerStyle={STYLES.modalView}>
      {/* <Pressable style={STYLES.backButton} onPress={closeModal}>
        <AntDesign name="arrowleft" size={50} color="black" />
      </Pressable> */}
      {stepsIndex > 0 &&
        <View style={STYLES.nextButtonContainer}>
        <Pressable style={STYLES.nextButton} onPress = {onPressBack}>
          <AntDesign name="arrowleft" size={50} color="black" />
          <Text style={STYLES.nextButtonText}>Back</Text>
        </Pressable>
      </View>}

      {stepsIndex === 0 &&     
        <FormTextInput 
          label="What is the name of your loved one?"
          placeholder="Enter Name"
          onChangeText={text => {
            setCurrentInput(text);
            setNewProfile(
              {...newProfile, 
                name: text,
              }
            );
            }}
          defaultValue={newProfile.name}
          autoCapitalize="words"
        />
      }

      {stepsIndex === 1 && 
        <FormImageInput
          label="Add a picture of your loved one"
          imgSource={newProfile?.media}
          setImage={(media) => {
            setCurrentInput(media);
            setNewProfile({
              ...newProfile,
              media,
            });
          }}
        />
      }

      {stepsIndex === 2 && 
        <FormTextInput 
          label="What is their relationship to you?"
          placeholder="Enter Relationship"
          onChangeText={text => {
            setCurrentInput(text);
            setNewProfile(
              {...newProfile, 
                  relationship: text,
              })}}
          defaultValue={newProfile.relationship}
          autoCapitalize="words"
        />
      }

      {stepsIndex === 3 && 
      <View style={STYLES.formDateInputContainer}>
        <Text style={STYLES.formText}>What is their birthday?</Text>
        <DatePicker 
          date={newProfile.dob}
          onDateChange={(value) => 
            {
              // setCurrentInput(value);
              setNewProfile(
                {...newProfile, 
                    dob: value,
                })
              }
          }
          mode="date"
          maximumDate={new Date()}
        />
      </View>
      }

      {stepsIndex === 4 && 
      <View style={STYLES.formInputContainer}>
        <Text style={STYLES.formText}>Is there any additional information about this person you would like to add?</Text>
        <View style={STYLES.buttonRow}>
          <Pressable style={STYLES.confirmButton} onPress={()=> setStepsIndex(stepsIndex+2)}>
            <Text style={STYLES.defaultButtonText}>Yes</Text>
          </Pressable>
          <Pressable style={STYLES.rejectButton} onPress={()=> setStepsIndex(stepsIndex+1)}>
            <Text style={STYLES.defaultButtonText}>No</Text>
          </Pressable>
        </View>
      </View>
      }

      {stepsIndex === 6 && 
      <View style={STYLES.formInputContainer}>
        <Text style={STYLES.formText}>Choose the type of information to add</Text>
        <Picker
          style={{width:300}}
          selectedValue={selectedInputKey}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue !== "other")
              setCurrentInput(itemValue);
            setSelectedInputKey(itemValue)
          }}>
          {pickerItems.map((key) => (
            <Picker.Item key={key} label={key} value={key} />
          ))}
          <Picker.Item label="Add your own type" value="other" />
        </Picker>

        {selectedInputKey=== "other" &&
          <TextInput
            style={STYLES.formInput}
            placeholder={`Enter Type of Information`}
            onChangeText={text => {
              setCurrentInput(text);
              setCustomKey(text);
            }}
            defaultValue={customKey}
            autoCapitalize="words"
          />
        }
      </View>
      }

      {stepsIndex === 7 && 
      <View style={STYLES.formInputContainer}>
        <Text style={STYLES.formText}>Enter the corresponding information</Text>
        <TextInput
            style={STYLES.formInput}
            placeholder={`Enter Their ${selectedInputKey=== "other" ? customKey : selectedInputKey}`}
            onChangeText={text => {
              setCurrentInput(text);
              setSelectedInputValue(text);
            }}
            defaultValue={selectedInputValue}
        />
      </View>
      }
      
      <View>
      {stepsIndex === 5
      ? 
      <View style={STYLES.formInputContainer}> 
        <Text style={STYLES.formText}>Great! You are all done. Press Submit to finish adding the new profile.</Text> 
        <Pressable 
          style={STYLES.submitButton}
          onPress={addProfile}
        >
          <Text style={STYLES.defaultButtonText}>Submit</Text>
        </Pressable>
        </View>
      : 
      stepsIndex !== 4 &&  // stepsIndex < 6 &&
      <View style={STYLES.nextButtonContainer}>
        <Pressable style={STYLES.nextButton} onPress = {onPressNext}>
          <AntDesign name="arrowright" size={50} color="black" />
          <Text style={STYLES.nextButtonText}>Next</Text>
        </Pressable>
      </View>
      }
      </View>

    </ScrollView>
    </View>
	);
}

const STYLES = StyleSheet.create({
	modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    minHeight: 500,
  }, 
  formInputContainer: {
    alignItems: "center",
    alignContent: "center"
  }, 
  formText: {
    fontSize: 25,
    textAlign: 'center',
  },
  formInput: {
    fontSize: 20,
    // height:
  },
  formDateInputContainer: {
    height: 250,
  },  
  confirmButton: {
    backgroundColor: COLORS.BASEPURPLE,
    borderRadius: 20,
		paddingVertical: 10,
    paddingHorizontal: 20,
		elevation: 2,
    marginHorizontal: 10,
  },
  rejectButton: {
    backgroundColor: COLORS.BASEBLUE,
    borderRadius: 20,
		padding: 10,
    paddingHorizontal: 20,
		elevation: 2,
    marginHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
  },  
  submitButton: {
    backgroundColor: COLORS.BASEPURPLE,
    borderRadius: 20,
		padding: 10,
		elevation: 2,
  },
  nextButtonContainer: {
    justifyContent: "center",
  },
  nextButton: {
    backgroundColor: COLORS.BASEGREEN,
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  nextButtonText: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  defaultButtonText: {
    fontSize: 20,
  }
});

export default ProfileForm;