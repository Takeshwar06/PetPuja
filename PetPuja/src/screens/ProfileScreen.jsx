import { View, Text, Button } from 'react-native'
import React from 'react'
import axios from 'axios'
import { host } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='get token' onPress={async () => {
        try {
        console.log(await AsyncStorage.getItem('isFirstVisiting'));
        console.log(await AsyncStorage.getItem('user'));
        console.log(await AsyncStorage.getItem('deliveryPartner'));
        } catch (error) {
          console.log(error?.response?.data||error);
        }
      }} />

      <Button title='Logout' onPress={async()=>{
        await AsyncStorage.removeItem("user");
        navigation.reset({
          index: 0,
          routes: [{ name: 'CustomerLoginScreen' }],
        })
      }}/>
    </View>
  )
}