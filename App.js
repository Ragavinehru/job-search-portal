import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screens/Login';
import Search from './Test2';
import register from './src/Screens/Register';
import 'react-native-url-polyfill/auto';
// import 'react-native-get-random-values';
import { supabase } from '../../supabase';


// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseUrl = "https://jmmmahusotnqiiyjmnnh.supabase.co"
// const supabaseKey = 'SUPABASE_CLIENT_API_KEY'
// const supabase = createClient(supabaseUrl, supabaseKey);

const Stack = createNativeStackNavigator();

const App = () => {
  // const getitems = async () => {
  //   let { data: users, error } = await supabase
  //     .from('users')
  //     .select('id')

  //   return users
  // }
  // useEffect(() => {
  //   getitems()
  //     .then((items) => {
  //       console.log("users", users)
  //     })
  // }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="register" component={register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App