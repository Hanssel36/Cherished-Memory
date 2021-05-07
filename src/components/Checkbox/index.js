import React from 'react'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = '#211f30', text = '', ...props}) => (
  <Pressable style={styles.checkBox} onPress={onPress} {...props}>
    <Icon
        size={size}
        color={color}
        name={ selected ? 'check-box' : 'check-box-outline-blank'}
    />

    <Text style={textStyle}> {text} </Text>
  </Pressable>
)

export default CheckBox