import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { COLORS } from '../../styles';

export default function Profile({profile}) {
	const dobDateObj = new Date(profile?.dob)
	const dobUTC = {
		month: dobDateObj.getUTCMonth() + 1, //months from 1-12
		day: dobDateObj.getUTCDate(),
		year: dobDateObj.getUTCFullYear(),
	}
	return (
		<View style={STYLES.profileCard}>
			<Image 
				source={{uri: `data:image/jpeg;base64,${profile?.media?.uri}`}}
			/>
				<Text>
					Name: {profile?.name}
				</Text>
				<Text>
					Relationship: {profile?.relationship}
				</Text>
				<Text>
					Birthday: {dobUTC.month+"/"+dobUTC.day+"/"+dobUTC.year}
				</Text>

		</View>
	);
}

const STYLES = StyleSheet.create({
	profileCard: {
		padding: 15,
		backgroundColor: COLORS.BACKGROUNDGRAY,
		borderRadius: 15,
		width: "42%",
		margin: 10,
		fontFamily: "Oxygen-Regular",
	}
});