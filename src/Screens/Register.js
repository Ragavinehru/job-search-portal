import React, { useState, useEffect } from 'react';
import {
    Button, Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight, TouchableOpacity,
    View, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';
import LottieView from 'lottie-react-native';
import { Alert } from 'react-native';




const Register = () => {
    const navigation = useNavigation();

    const [isUserModalVisible, setUserModalVisible] = useState(false);
    const [isEmployerModalVisible, setEmployerModalVisible] = useState(false);

    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState();
    const [empname, setEmpname] = useState('');
    const [empcompany, setempcompany] = useState();
    const [emplocation, setemplocation] = useState('');
    const [empmobile, setempmob] = useState('');
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [Location, setlocation] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);


    const handleSignUp = async () => {
        console.log("init")
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            // name: name,
            // location: Location,
            // mobile: mobile,
        });
        console.log('Signed up:', data, error);

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            insertFn(data?.user?.id);
            console.log("done");
            // const { res, error } = await supabase.from('users').insert([
            //     {
            //         email: email,
            //         // password: password,
            //         name: name,
            //         location: Location,
            //         mobile: mobile,

            //     }
            // ]);
            // setemail('');
            // setname('');
            // setmobile('');
            // setlocation('');
            // setPassword('');
            // if (error) {
            //     console.error('error insert data:', error.message);
            // }
        }
    };

    const insertFn = async (id) => {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    email: email,
                    name: name,
                    location: Location,
                    mobile: mobile,
                    userId: id,
                }
            ])
            .select();

        console.log("in :", data, error);
    }

    const handleSignempUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: employeeEmail,
            password: employeePassword,
            // name: empname,
            // location: emplocation,
            // company_name: empcompany,


        });

        console.log("emp", data, error);

        if (error) {
            console.error('Error signing up employee:', error.message);
            Alert.alert('Sign Up Failed', 'Please try again.');
        } else {
            insertemp(data?.user?.id);
            console.log("done");
            Alert.alert('Sign Up Successful', 'You are now signed Up.');
            // const empId = data.id;
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
            setempmob('');

            // if (error) {
            //     console.error('error insert emp data:', error.message);
            // }
        }
    };


    const insertemp = async (id) => {
        const { data, error } = await supabase
            .from('employers')
            .insert([
                {
                    email: employeeEmail,
                    name: empname,
                    location: emplocation,
                    company_name: empcompany,
                    userId: id,
                    mobile: empmobile,
                }
            ])
            .select();

        console.log("in :", data, error);
    }


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

        <ScrollView style={{ width: '100%' }}>
            {/* <View style={STYLES.containereg}>
                <Image style={STYLES.front} source={require('../assets/reg.png')} />
            </View> */}

            <View style={STYLES.containereg}>
                <Image style={STYLES.front} source={require('../assets/reg.png')} />
            </View>

            <View style={{ marginVertical: 100 }}>
                <Text style={{ fontSize: 22, color: COLORS.dark, textAlign: "center" }}>Please register yourself as</Text>

                <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginTop: 70, justifyContent: "space-around" }}>
                    <TouchableHighlight style={STYLES.cloudButton} onPress={toggleUserModal}>
                        <Text style={STYLES.buttonText}>User</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={STYLES.cloudButton} onPress={toggleEmployerModal}>
                        <Text style={STYLES.buttonText}>Employer</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 30 }}>
                    <Text style={{ fontSize: 17, color: COLORS.dark }}>Already a User</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={STYLES.registerText}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isUserModalVisible}
                    onRequestClose={toggleUserModal}>
                    <View style={{ backgroundColor: '#F5EEF8', height: '100%', width: '100%', flex: 1, alignSelf: 'center' }}>

                        <TouchableOpacity onPress={userModal}>
                            <Image style={{ marginLeft: 'auto', marginRight: 33, width: '6%', marginTop: 45, height: '12%' }} source={require('../assets/close.png')} />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: -34, marginRight: 10, alignSelf: 'center' }}>Register yourself as User!</Text>
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
                        <TouchableOpacity onPress={closeModal}>
                            <Image style={{ marginLeft: 'auto', marginRight: 33, width: '6%', marginTop: 45, height: '12%' }} source={require('../assets/close.png')} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: -34, marginRight: 10, alignSelf: 'center' }}>Register yourself as Employer!</Text>
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Email"
                            value={employeeEmail}
                            onChangeText={(text) => setEmployeeEmail(text)}
                        />
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Password"
                            secureTextEntry
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
                        <TextInput
                            style={STYLES.uservalue}
                            placeholder="Mobile"
                            value={empmobile}
                            onChangeText={(text) => setempmob(text)}
                        />
                        {/* <Button title="Register as Employee" onPress={handleSignempUp} /> */}
                        <View style={{ flexDirection: 'row', marginTop: 100, alignSelf: 'center' }}>
                            <TouchableOpacity style={STYLES.cloudButton} onPress={handleSignempUp}>
                                <Text style={STYLES.buttonText}>Register</Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                </Modal>
            </View>
        </ScrollView>

    );

}

export default Register;