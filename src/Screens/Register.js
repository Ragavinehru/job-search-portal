import React, { useState, useEffect } from 'react';
import {
    Button, Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import { supabase } from '../../supabase';

const Register = () => {
    const [isUserModalVisible, setUserModalVisible] = useState(false);
    const [isEmployerModalVisible, setEmployerModalVisible] = useState(false);

    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [users, setUsers] = useState([]);
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
        <ScrollView>

            <View>
                <Text>Job Portal</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                    <TouchableHighlight onPress={toggleUserModal}>
                        <Text>User</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={toggleEmployerModal}>
                        <Text>Employer</Text>
                    </TouchableHighlight>
                </View>
            </View>

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isUserModalVisible}
                    onRequestClose={toggleUserModal}>
                    <View style={{ backgroundColor: 'pink', height: 100, flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
                        <Button title="Sign Up" onPress={handleSignUp} />
                        <TouchableHighlight onPress={userModal}>
                            <Text style={{ color: 'red' }}>Close</Text>
                        </TouchableHighlight>
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

        </ScrollView>
    );

}

export default Register