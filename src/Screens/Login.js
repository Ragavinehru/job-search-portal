import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import STYLES from '../styles';
import COLORS from '../colors/color';
import { Alert } from 'react-native';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            const { error } = await supabase.auth.api.resetPasswordForEmail(email);

            if (error) {
                console.error('Error sending password reset email:', error.message);
                Alert.alert('Password Reset Failed', 'Please check the email address you provided.');
            } else {
                Alert.alert('Password Reset', 'An email with instructions has been sent to your email address.');
            }
        } catch (error) {
            console.error('Error handling password reset:', error);
        }
    };

    const handleLogin = async () => {
        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,

            });

            console.log("data user", data.user.id, error)
            const userId = data.user.id;
            global.userId = userId;
            console.log('User ID:', userId);

            const { data1, error1 } = await supabase
                .from('employers')
                .select('*')
                .eq('userId', userId)
                .single()

            console.log("userdata", data1);

            if (data1) {
                Alert.alert('Sign In Successful', 'You are now signed in.');
                navigation.navigate('userscreen', { userId: userId });
            } else {
                Alert.alert('Sign In Successful', 'You are now signed in.');
                navigation.navigate('home', { userId: userId });
            }



        } catch (error) {
            console.error('Error handling login:', error);
        }

    };
    // const handleLogin = async () => {
    //     try {
    //         const { data, error } = await supabase.auth.signInWithPassword({
    //             email: email,
    //             password: password,
    //         });

    //         if (error) {
    //             console.error('Error signing in:', error.message);
    //             return;
    //         }

    //         const userId = data.user.id;
    //         global.userId = userId;
    //         console.log('User ID:', userId);

    //         const { data: userData, error: userError } = await supabase
    //             .from('users')
    //             .select('*')
    //             .eq('userId', userId)
    //             .single();

    //         const { data: employerData, error: employerError } = await supabase
    //             .from('employers')
    //             .select('*')
    //             .eq('userId', userId)
    //             .single();

    //         if (userError || employerError) {
    //             console.error('Error fetching user or employer data:', userError || employerError);
    //             return;
    //         }

    //         if (userData) {
    //             // User exists
    //             Alert.alert('Sign In Successful', 'You are now signed in as a regular user.');
    //             navigation.navigate('userscreen', { userId: userId });
    //         } else if (employerData) {
    //             // Employer exists
    //             Alert.alert('Sign In Successful', 'You are now signed in as an employer.');
    //             navigation.navigate('employerScreen', { userId: userId });
    //         } else {
    //             // Neither user nor employer
    //             Alert.alert('Sign In Successful', 'You are now signed in, but your role is undefined.');
    //             navigation.navigate('home', { userId: userId });
    //         }
    //     } catch (error) {
    //         console.error('Error handling login:', error);
    //     }
    // };

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={STYLES.container}>

                <Image style={STYLES.front} source={require('../assets/front.png')}></Image>
            </View>
            <Text style={{ fontSize: 23, color: COLORS.dark, marginTop: 282, position: 'absolute', marginLeft: 12 }}>Welcome to JobSearch!</Text>

            <View style={{ padding: 12, marginTop: 110 }}>

                <TextInput
                    style={STYLES.textvalue}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={STYLES.text2value}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={handleResetPassword}>
                    <Text style={{ marginLeft: '58%', marginTop: 2, color: COLORS.dark }}>Forget Password..?</Text>
                </TouchableOpacity>
            </View>
            {/* <Button title="Login" onPress={handleLogin} /> */}
            <TouchableOpacity style={STYLES.cloudButton} onPress={handleLogin}>
                <Text style={STYLES.buttonText}>Log In</Text>
            </TouchableOpacity>

            <View>
                <Text style={{ fontSize: 17, color: COLORS.dark, marginTop: 12, marginRight: 90, alignSelf: 'center' }}>Dont have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('register')}>
                    <Text style={STYLES.registerText}>Register here</Text>
                </TouchableOpacity>
            </View>
            {/* <Image style={{ width: '100%', height: '50%', marginTop: 250 }} source={require('../assets/logo.png')}></Image> */}

        </View >
    );
}

export default Login;
