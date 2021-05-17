import React from 'react';
import { Text, StyleSheet, View, TextInput, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../../styles"

const FormTextInput = ({
	label, 
	placeholder="", 
	onChangeText, 
	defaultValue, 
	column=true, 
	removable=false,
	onPressRemove,
	...props
}) => {
	return (
		<View style={column ? STYLES.columnFormInputContainer : STYLES.flexRowInputContainer}>    
			<Text style={column ? STYLES.columnFormLabel : STYLES.flexRowLabel}>{label}</Text>
			<TextInput
					style={column ? STYLES.columnFormInput : removable ? STYLES.flexRowInputRemovable : STYLES.flexRowInput}
					placeholder={placeholder}
					onChangeText={onChangeText}
					defaultValue={defaultValue}
					autoCapitalize="words"
					{...props}
			/>
			{removable && 
				<Pressable style={STYLES.buttonRemoveInput} onPress={onPressRemove}>
					<AntDesign name="closecircle" size={20} />
				</Pressable>

			}
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
    fontSize: 20,
		width: "50%",
		fontWeight: "bold",
  },
  flexRowInput: {
    fontSize: 20,
		backgroundColor: "white",
		width: "50%",
		marginVertical: 5,
		// height: 50,
		paddingVertical: 0,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
  },
	buttonRemoveInput: {
		alignSelf: "center",
		marginLeft: 5,
	},
	flexRowInputRemovable: {
		fontSize: 20,
		width: "42.5%",
		overflow: "scroll",
		backgroundColor: "white",
		paddingVertical: 0,
		marginVertical: 10,
		borderRadius: 5,
		borderColor: COLORS.BASEDARKGRAY,
		borderWidth: 2,
	},
});

export default FormTextInput;
