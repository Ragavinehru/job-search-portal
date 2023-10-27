import React, { useState, useEffect } from 'react';
import {
    Button, Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight, TouchableOpacity,
    View, Image
} from 'react-native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';
import LottieView from 'lottie-react-native';




const Register = () => {
    const [isUserModalVisible, setUserModalVisible] = useState(false);
    const [isEmployerModalVisible, setEmployerModalVisible] = useState(false);

    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     async function fetchTasks() {
    //         const { data, error } = await supabase.from('users').select('*');
    //         console.log("datattat", data)
    //         if (error) {
    //             console.error('Error fetching users:', error.message);
    //         } else {
    //             setUsers(data);
    //         }
    //     }
    //     console.log("users", users)

    //     fetchTasks();
    // }, []);

    const handleSignUp = async () => {
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            console.log('Signed up:', user);
        }
    };


    const toggleUserModal = () => {
        setUserModalVisible(!isUserModalVisible);
    };

    const toggleEmployerModal = () => {
        setEmployerModalVisible(!isEmployerModalVisible);
    };
    const closeModal = () => {
        setEmployerModalVisible(false);
    };
    const userModal = () => {
        setUserModalVisible(false);
    };
    return (

        <View style={{ flex: 1 }}>
            <View style={STYLES.containereg}>

                <Image stle={STYLES.front} source={require('../assets/reg.png')}></Image>
                {/* <LottieView
        source={require('./path/to/your-animation.json')}
        autoPlay
        loop
      /> */}
            </View>
            <View style={{ marginTop: 100 }}>
                <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: 72, marginRight: 10, alignSelf: 'center' }}>Please select purpose of app</Text>
                <View style={{ flexDirection: 'row', marginTop: 70, justifyContent: 'space-around' }}>
                    <TouchableHighlight style={STYLES.cloudButton} onPress={toggleUserModal}>
                        <Text style={STYLES.buttonText}>User</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={STYLES.cloudButton} onPress={toggleEmployerModal}>
                        <Text style={STYLES.buttonText}>Employer</Text>
                    </TouchableHighlight>
                </View>
            </View>

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isUserModalVisible}
                    onRequestClose={toggleUserModal}>
                    <View style={{ backgroundColor: COLORS.dark, height: '100%', width: '100%', flex: 1, alignSelf: 'center' }}>

                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 100 }}>
                            <TouchableOpacity style={STYLES.cloudButton} onPress={handleSignUp}>
                                <Text style={STYLES.buttonText}>Register</Text>
                            </TouchableOpacity>

                            <TouchableHighlight style={STYLES.cloudButton} onPress={userModal}>
                                <Text style={STYLES.buttonText}>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isEmployerModalVisible}
                    onRequestClose={toggleEmployerModal}
                >
                    <View style={{ backgroundColor: 'pink', height: 100, flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <TextInput
                            placeholder="Email"
                            value={employeeEmail}
                            onChangeText={(text) => setEmployeeEmail(text)}
                        />
                        <TextInput
                            placeholder="Password"
                            value={employeePassword}
                            onChangeText={(text) => setEmployeePassword(text)}
                        />

                        <Button title="Register as Employee" onPress={handleSignUp} />
                        <TouchableHighlight onPress={closeModal}>
                            <Text style={{ color: 'red' }}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        </View>

    );

}

export default Register