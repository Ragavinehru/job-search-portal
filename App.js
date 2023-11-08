import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './src/Screens/Login';
import Search from './Test2';
import register from './src/Screens/Register';
import 'react-native-url-polyfill/auto';
import { supabase } from '../../supabase';
import EmployerScreen from './src/Screens/EmployerScreen';
import UserScreen from './src/Screens/UserScreen';
import EmployerProfile from './src/Screens/EmployerProfile';
import ForgetPassword from './src/Screens/ForgetPassword';
import Userprofile from './src/Screens/Userprofile';
import Jobdetails from './src/Screens/Jobdetails';
import Postedjobs from './src/Screens/Postedjobs';
import UserDashboard from './src/Screens/UserDashboard';
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="home" component={EmployerScreen} />
        <Stack.Screen name="register" component={register} />
        <Stack.Screen name="userscreen" component={UserScreen} />
        <Stack.Screen name="empprofile" component={EmployerProfile} />
        <Stack.Screen name="userprofile" component={Userprofile} />
        <Stack.Screen name="forgetpassword" component={ForgetPassword} />
        <Stack.Screen name="jobdetails" component={Jobdetails} />
        <Stack.Screen name="postedjob" component={Postedjobs} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App