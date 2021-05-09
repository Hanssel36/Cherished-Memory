import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { COLORS } from "../../styles"

const AuthInput = ({
	label, 
	placeholder, 
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
					placeholder={placeholder ?? `Enter Your ${label}`}
					onChangeText={onChangeText}
					defaultValue={defaultValue}
          autoCapitalize="none"
					{...props}
			/>
		</View>
	);
}

const STYLES = StyleSheet.create({
  columnFormInputContainer: {
    // alignItems: "center",
    alignContent: "center",
    marginVertical: 15,
  }, 
  columnFormLabel: {
    fontSize: 25,
    fontWeight: "bold",
  },
  columnFormInput: {
    fontSize: 25,
		backgroundColor: "white",
		marginVertical: 5,
		paddingVertical: 0,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
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
		fontWeight: "bold",
  },
  flexRowInput: {
    fontSize: 25,
		backgroundColor: "white",
		marginVertical: 5,
		// height: 50,
		paddingVertical: 0,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
  },
});

export default AuthInput;
