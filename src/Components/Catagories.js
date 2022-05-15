import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'

const Catagories = ({ img, color,title }) => {
    return (
        <View style={{ margin:5, alignItems:"center" }}>
        <View style={{ backgroundColor: color, borderRadius: 50, paddingHorizontal: 20, paddingVertical: 20 }}>
        <Image source={{ uri: img, height: 30, width: 30 }}  />
        </View>
            <Text style={{ marginBottom:3, paddingBottom:3}}>{title}</Text>
        </View>
    )
}

export default Catagories

const styles = StyleSheet.create({})