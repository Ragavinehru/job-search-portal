import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';
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
            const { error } = await supabase.auth.resetPasswordForEmail(email);

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

            if (error) {
                console.error('Error signing in:', error.message);
                return;
            }

            const userId = data.user.id;
            global.userId = userId;
            console.log('User ID:', userId);

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('userId', userId)
                .single();
            console.log('User Data:', userData, userError);

            const { data: employerData, error: employerError } = await supabase
                .from('employers')
                .select('*')
                .eq('userId', userId)
                .single();

            console.log('employer Data:', employerData, employerError);
            try {
                if (userData) {

                    Alert.alert('Sign In Successful', 'You are now signed in as a regular user.');
                    setEmail('');
                    setPassword('');
                    // navigation.navigate("userscreen", { userData: userData });
                    navigation.navigate("userscreen", {
                        userData: userData,

                    });
                } else if (employerData) {

                    Alert.alert('Sign In Successful', 'You are now signed in as an employer.');
                    setEmail('');
                    setPassword('');
                    navigation.navigate('home', { employerData: employerData });
                }

                // else {
                //     
                //     Alert.alert('Sign In Successful', ');
                //     navigation.navigate('userscreen', { userId: userId });
                // }
            } catch (error) {
                console.error('Navigation Error:', error);
            }

        } catch (error) {
            console.error('Error handling login:', error);
        }
    };

    return (
        <ScrollView style={{ width: '100%' }}>
            <StatusBar
                animated={true}
                backgroundColor={COLORS.light}
            />
            <View style={STYLES.container}>
                <Image style={STYLES.front} source={require('../assets/front.png')}></Image>
            </View>

            <Text style={{ fontSize: 23, color: COLORS.dark, marginVertical: 32, marginLeft: 12 }}>Welcome to JobSearch!</Text>

            <View>
                <TextInput
                    style={STYLES.textvalue}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View>
                <TextInput
                    style={STYLES.textvalue}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
                <Text style={{ marginLeft: "auto", marginRight: '10%', marginTop: 5, color: COLORS.dark }}>Forget Password..?</Text>
            </TouchableOpacity>
            {/* <Button title="Login" onPress={handleLogin} /> */}
            <TouchableOpacity style={STYLES.cloudButton} onPress={handleLogin}>
                <Text style={STYLES.buttonText}>Log In</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 30 }}>
                <Text style={{ fontSize: 17, color: COLORS.dark }}>Dont have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('register')}>
                    <Text style={STYLES.registerText}>Register here</Text>
                </TouchableOpacity>
            </View>
            {/* <Image style={{ width: '100%', height: '50%', marginTop: 250 }} source={require('../assets/logo.png')}></Image> */}

        </ScrollView >
    );
}

export default Login;
