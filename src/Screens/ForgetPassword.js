import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { supabase } from '../../supabase';
import { useState } from 'react';
import STYLES from '../styles';
import COLORS from '../colors/color';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const ForgetPassword = () => {
    const navigation = useNavigation();
    const demo = async () => {
        // const { data: { user } } = await supabase.auth.getUser()
        // let { data, error } = await supabase.auth.resetPasswordForEmail('samcaleb9861@gmail.com')
        // let { data, error } = await supabase.auth.api.inviteUserByEmail('samcaleb9861@gmail.com')

        // let { data, error } = await supabase.auth.resetPasswordForEmail(email)
        // const { data, error } = await supabase.auth.updateUser({
        //     email: "samcaleb9861@gmail.com",
        //     password: "password",
        //     data: { hello: 'world' }
        // })
        // console.log("mail", data, error)

        // const new_password = "123456789";
        // const email = "ragavi123345@gmail.com"
        let { data: user, error } = await supabase
            .from('users')
            .select('email').eq("email", emailreset);
        console.log("ss", user, error)
        if (user) {
            const res = await supabase.auth.updateUser({ password: forgetpwd })
            Alert.alert('New password changed ');
            setemailreset('');
            setforgetpwd('');
            console.log("dd", res)
        } else {
            Alert.alert('User Not Found');
        }
        // const res = await supabase.auth.updateUser({ password: forgetpwd })
        // console.log("dd", res)
    }
    const [forgetpwd, setforgetpwd] = useState('');
    const [emailreset, setemailreset] = useState('');

    return (
        <View>
            <TouchableOpacity onPress={navigation.goBack}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12 }}> Back </Text>
            </TouchableOpacity>
            <TextInput style={STYLES.uservalue} placeholder='Email' value={emailreset} onChangeText={(text) => setemailreset(text)} ></TextInput>

            <TextInput style={STYLES.uservalue} placeholder='New Password' value={forgetpwd}
                onChangeText={(text) => setforgetpwd(text)}></TextInput>
            <TouchableOpacity>
                <Text onPress={demo} style={{ fontSize: 23, color: COLORS.light, alignSelf: 'center' }}>Verify</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <Text onPress={demo} style={{ fontSize: 23, color: COLORS.light, alignSelf: 'center' }}>ResetPassword</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default ForgetPassword