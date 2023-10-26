import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Error signing in:', error.message);
            } else {
                console.log('User signed in:', user);

                // navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Error handling login:', error);
        }
    };

    return (
        <View>
            <Text>Job Portal</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('register')}>Register</Text>
        </View>
    );
}

export default Login;
