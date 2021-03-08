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
	// console.log(profile)
	return (
		<View style={STYLES.profileCard}>
			<Image 
				source={profile?.media?.uri ? {uri: profile?.media?.uri} : require('../../assets/images/placeholderprofile.png')}
				style={STYLES.image}
			/>
			<Text style={STYLES.profileText}>
				Name: {profile?.name}
			</Text>
			<Text style={STYLES.profileText}>
				Relationship: {profile?.relationship}
			</Text>
			<Text style={STYLES.profileText}>
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
	},
	image: {
		width: '100%',
		height: undefined,
		aspectRatio: 1,
		marginBottom: 10,
	},
	profileText: {
		fontSize: 18,
	}
});