import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

const FormInput = ({label, placeholder, onChangeText, defaultValue, ...props}) => {
	return (
		<View style={STYLES.formInputContainer}>    
			<Text style={STYLES.formText}>{label}</Text>
			<TextInput
					style={STYLES.formInput}
					placeholder={placeholder}
					onChangeText={onChangeText}
					defaultValue={defaultValue}
					autoCapitalize="words"
					{...props}
			/>
		</View>
	);
}

const STYLES = StyleSheet.create({
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
  },
});

export default FormInput;
