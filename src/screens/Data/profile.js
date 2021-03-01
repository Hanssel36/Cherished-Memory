import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { COLORS } from '../../styles';

export default function Profile({profile}) {
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
					Birthday: {String(profile?.dob)}
				</Text>

		</View>
	);
}

const STYLES = StyleSheet.create({
	profileCard: {
		padding: 3,
		backgroundColor: COLORS.BACKGROUNDGRAY,
	}
});