import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontStyles } from '../style/FontsStyle'

const Notification = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[fontStyles.bigButton_text]}>Notification data not available</Text>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({})