import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';

export default function Profile({profile}) {
	console.log(profile?.media)
	return (
		<View>
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