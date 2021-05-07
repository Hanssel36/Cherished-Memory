import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { COLORS } from "../../../styles"

const FormTextInput = ({
	label, 
	placeholder="", 
	onChangeText, 
	defaultValue, 
	column=true, 
	...props
}) => {
	return (
		<View style={column ? STYLES.columnFormInputContainer : STYLES.flexRowInputContainer}>    
			<Text style={column ? STYLES.columnFormLabel : STYLES.flexRowLabel}>{label}</Text>
			<TextInput
					style={column ? STYLES.columnFormInput : STYLES.flexRowInput}
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
  columnFormInputContainer: {
    alignItems: "center",
    alignContent: "center"
  }, 
  columnFormLabel: {
    fontSize: 25,
    textAlign: 'center',
  },
  columnFormInput: {
    fontSize: 20,
  },
  flexRowInputContainer: {
    display: "flex",
		flexDirection: "row",
		alignItems: "center",
    alignContent: "center",
		justifyContent: "space-between",
		borderBottomColor: COLORS.BASEGRAY,
		borderBottomWidth: 1,
		width: "100%",
		padding: 6,
  }, 
  flexRowLabel: {
    fontSize: 25,
		width: "50%",
		fontWeight: "bold",
  },
  flexRowInput: {
    fontSize: 25,
		backgroundColor: "white",
		width: "50%",
		marginVertical: 5,
		// height: 50,
		paddingVertical: 0,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
  },
});

export default FormTextInput;
