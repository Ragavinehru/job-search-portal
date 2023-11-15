import React, { useState, useEffect } from 'react';
import {
    Button, Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight, TouchableOpacity,
    View, Image, SafeAreaView
} from 'react-native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EmployerScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const employerData = route.params?.employerData;

    // const userId = employerData.userId;
    console.log("jjjjjjjjj", employerData);

    const [post, setpost] = useState(false);
    const [jobtitle, setjobtitle] = useState('');
    const [des, setdes] = useState('');
    const [exp, setexp] = useState('');
    const [loca, setloca] = useState('');
    const [contact, setcontact] = useState('');
    const [comname, setcomname] = useState('');
    const [pack, setpackage] = useState('');
    const [openings, setopening] = useState('');
    const [edu, setedu] = useState('');
    const [skills, setskills] = useState('');


    const postjob = () => {
        setpost(true);
    };
    const Viewcan = () => {
        navigation.navigate('Viewcandidate')
    };

    const postj = async () => {
        try {

            const jobDetails = {
                title: jobtitle,
                description: des,
                experience: exp,
                contact: contact,
                location: loca,
                company_name: comname,
                package: pack,
                openings: openings,
                education: edu,
                skills: skills,
                employer_id: userId,
            };


            const { data, error } = await supabase.from('jobs').insert([jobDetails]);
            console.log("data", data);
            if (error) {
                console.error('Error posting job:', error.message);
                Alert.alert('Job Posting Failed', 'There was an issue posting the job. Please try again.');
            } else {
                console.log('Job posted successfully:', data);
                Alert.alert('Job Posted', 'Your job has been posted successfully.');
                setpost(false);
            }
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity onPress={navigation.goBack}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12, }}> Back</Text>

            </TouchableOpacity>

            <View style={{ marginLeft: 15, marginTop: 55 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22 }}>Hello!!</Text>

                </View>
                <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.light }}>
                    Find perfect candidate!
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('empprofile', { employerData: employerData })}>
                    <Image style={STYLES.person} source={require('../assets/person.png')}></Image>
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: -100 }}>
                <View>
                    <TouchableOpacity style={STYLES.cloudButton} onPress={postjob}>
                        <Text style={STYLES.buttonText}>Post Job</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 33 }}>
                    <TouchableOpacity onPress={Viewcan} style={STYLES.cloudButton} >
                        <Text style={STYLES.buttonText}>View candidate</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Modal visible={post} transparent={false} animationType="slide" onRequestClose={() => setpost(false)}>
                <ScrollView>
                    <Text style={{ fontSize: 22, color: COLORS.dark, marginTop: 82, marginRight: 10, alignSelf: 'center' }}>Post A Job</Text>
                    <View style={{ marginTop: 23 }}>
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Job Title"
                            value={jobtitle}
                            onChangeText={setjobtitle}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Description"
                            value={des}
                            onChangeText={setdes}
                        />

                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Experience"
                            value={exp}
                            onChangeText={setexp}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Contact"
                            value={contact}
                            onChangeText={setcontact}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Location"
                            value={loca}
                            onChangeText={setloca}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Company Name"
                            value={comname}
                            onChangeText={setcomname}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Package"
                            value={pack}
                            onChangeText={setpackage}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Openings"
                            value={openings}
                            onChangeText={setopening}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Education"
                            value={edu}
                            onChangeText={setedu}
                        />
                        <TextInput
                            style={STYLES.postinput}
                            placeholder="Skills"
                            value={skills}
                            onChangeText={setskills}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 37, alignSelf: 'center' }}>
                        <TouchableOpacity style={STYLES.cloudButton}>
                            <Text style={STYLES.buttonText} onPress={postj}>Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ ...STYLES.cloudButton, marginLeft: 12 }} >
                            <Text style={STYLES.buttonText} onPress={() => setpost(false)}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
            <Image style={{ width: '100%', height: '47%', marginLeft: -7, marginTop: -29 }} source={require('../assets/emppage.png')} />

        </SafeAreaView>
    )
}

export default EmployerScreen;