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
import { Alert } from 'react-native';




const Register = () => {
    const [isUserModalVisible, setUserModalVisible] = useState(false);
    const [isEmployerModalVisible, setEmployerModalVisible] = useState(false);

    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState();
    const [empname, setEmpname] = useState('');
    const [empcompany, setempcompany] = useState();
    const [emplocation, setemplocation] = useState('');
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [Location, setlocation] = useState('');
    const [email, setemail] = useState('');
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
            name: name,
            location: Location,
            mobile: mobile,


        });

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            console.log('Signed up:', user);
            const { data, error } = await supabase.from('users').upsert([
                {
                    email: email,
                    // password: password,
                    name: name,
                    location: Location,
                    mobile: mobile,

                }
            ]);
            setemail('');
            setname('');
            setmobile('');
            setlocation('');
            setPassword('');
            if (error) {
                console.error('error insert data:', error.message);
            }
        }
    };

    const handleSignempUp = async () => {
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            name: name,
            location: Location,
            company_name: empcompany,


        });

        if (error) {
            console.error('Error signing up employee:', error.message);
            Alert.alert('Sign Up Failed', 'Please try again.');
        } else {
            console.log('Signed up employee:', user);
            Alert.alert('Sign Up Successful', 'You are now signed Up.');
            const userId = user.id;
            // const { data, error } = await supabase.from('employers').upsert([
            //     {
            //         userId,
            //         email: email,
            //         password: password,
            //         name: name,
            //         location: Location,
            //         mobile: mobile,

            //     }
            // ]);


            setEmployeeEmail('');
            setEmployeePassword('');
            setEmpname('');
            setempcompany('');
            setemplocation('');

            // if (error) {
            //     console.error('error insert emp data:', error.message);
            // }
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
                <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: 72, marginRight: 10, alignSelf: 'center' }}>Please register yourself as</Text>
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
                    <View style={{ backgroundColor: '#F5EEF8', height: '100%', width: '100%', flex: 1, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: 82, marginRight: 10, alignSelf: 'center' }}>Register yourself User!</Text>
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Email"
                            value={email}
                            onChangeText={setemail}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Name"
                            value={name}
                            onChangeText={setname}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Mobile"
                            value={mobile}
                            onChangeText={setmobile}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Location"
                            value={Location}
                            onChangeText={setlocation}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 100, alignSelf: 'center' }}>
                            <TouchableOpacity style={STYLES.cloudButton} onPress={handleSignUp}>
                                <Text style={STYLES.buttonText}>Register</Text>
                            </TouchableOpacity>

                            <TouchableHighlight style={STYLES.closeButton} onPress={userModal}>
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
                    <View style={{ backgroundColor: '#F5EEF8', height: '100%', width: '100%', flex: 1, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: 82, marginRight: 10, alignSelf: 'center' }}>Register yourself Employer!</Text>
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Email"
                            value={employeeEmail}
                            onChangeText={(text) => setEmployeeEmail(text)}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Password"
                            value={employeePassword}
                            onChangeText={(text) => setEmployeePassword(text)}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Name"
                            value={empname}
                            onChangeText={(text) => setEmpname(text)}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Company Name"
                            value={empcompany}
                            onChangeText={(text) => setempcompany(text)}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Location"
                            value={emplocation}
                            onChangeText={(text) => setemplocation(text)}
                        />
                        {/* <Button title="Register as Employee" onPress={handleSignempUp} /> */}
                        <View style={{ flexDirection: 'row', marginTop: 100, alignSelf: 'center' }}>
                            <TouchableOpacity style={STYLES.cloudButton} onPress={handleSignempUp}>
                                <Text style={STYLES.buttonText}>Register</Text>
                            </TouchableOpacity>

                            <TouchableHighlight style={STYLES.closeButton} onPress={closeModal}>
                                <Text style={STYLES.buttonText}>Close</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </Modal>
            </View>
        </View>

    );

}

export default Register