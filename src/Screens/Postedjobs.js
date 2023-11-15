import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';


const Postedjobs = () => {
    const route = useRoute();
    // const empdetails = employerData;
    // const employerData = route.params?.employerData;
    // const employerid = employerData.userId;
    const userId = global.userId;
    console.log('Global view id:', userId);
    const navigation = useNavigation();
    // console.log("hhhhhhh", employerid)
    const [postedJobs, setPostedJobs] = useState([]);
    const [postedJobDetails, setPostedJobDetails] = useState([]);
    const [editJobId, setEditJobId] = useState(null);
    const [editJobTitle, setEditJobTitle] = useState('');
    const [editJobLocation, setEditJobLocation] = useState('');
    const [editJobCompanyName, setEditJobCompanyName] = useState('');
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);


    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('employer_id', userId);

                if (error) {
                    console.error('Error fetching posted jobs:', error);
                } else {
                    setPostedJobs(data);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchPostedJobs();
    }, [userId]);




    //delete the job 
    const deletePostedJob = async (jobId) => {
        console.log("rrrrrrrrrrrh", jobId)
        try {

            await supabase.from('jobs').delete().eq('id', jobId);


            setPostedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));

            console.log('Job deleted successfully');

        } catch (error) {
            console.error('Error deleting posted job:', error);
        }
    };

    const openEditModal = (jobId, title, location, companyName) => {
        setIsEditModalVisible(true);
        console.log("Opening edit modal for job:", jobId);
        console.log("Job details:", title, location, companyName);
        setEditJobId(jobId);
        setEditJobTitle(title);
        setEditJobLocation(location);
        setEditJobCompanyName(companyName);

    };


    const closeEditModal = () => {
        setIsEditModalVisible(false);
        // Clear edit job details
        setEditJobId(null);
        setEditJobTitle('');
        setEditJobLocation('');
        setEditJobCompanyName('');
    };

    const saveEditedJob = async () => {
        try {
            console.log('Updating job with data:', {
                id: editJobId,
                title: editJobTitle,
                location: editJobLocation,
                company_name: editJobCompanyName,
            });
            const { data, error } = await supabase
                .from('jobs')
                .update([
                    {
                        id: editJobId,
                        title: editJobTitle,
                        location: editJobLocation,
                        company_name: editJobCompanyName,
                    },

                ])
                .eq('id', editJobId);

            // Close the edit modal

            // setPostedJobs(data);

            if (error) {
                console.error('Error updating profile:', error);
            } else {
                console.log('Profile updated successfully');
                setPostedJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job.id === editJobId
                            ? {
                                ...job,
                                title: editJobTitle,
                                location: editJobLocation,
                                company_name: editJobCompanyName,
                            }
                            : job
                    )
                );
                closeEditModal();


            }
        } catch (error) {
            console.error('Error editing posted job:', error);
        }
    };


    return (
        <ScrollView >
            <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -2, marginTop: 10 }}> Back </Text>
                    {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
                </TouchableOpacity>
                <Text style={STYLES.profiledetails}>   Posted Jobs</Text>
                <FlatList
                    data={postedJobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={STYLES.cardposted}>



                            <Text style={STYLES.postedjob}>{item.title}</Text>
                            <Text style={STYLES.jobDescription}> Location: {item.location}</Text>
                            <Text style={STYLES.jobDescription}>Company Name: {item.company_name}</Text>

                            <View style={{ marginLeft: 'auto', marginTop: -52 }}>
                                <TouchableOpacity onPress={() => deletePostedJob(item.id)}>
                                    <Image style={{ width: 19, height: 19, }} source={require('../assets/delete.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openEditModal(item.id, item.title, item.location, item.company_name)}>
                                    <Image style={{ width: 17, height: 17, marginTop: 20 }} source={require('../assets/edit.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                <Modal
                    visible={isEditModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeEditModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={STYLES.editjob}>
                            <Text style={{ fontWeight: '700', fontSize: 20, alignSelf: 'center', color: COLORS.dark }}>Edit Job</Text>
                            <TextInput
                                placeholder="Title"
                                value={editJobTitle}
                                onChangeText={(text) => setEditJobTitle(text)}
                                style={STYLES.useredit}
                            />
                            <TextInput
                                placeholder="Location"
                                value={editJobLocation}
                                onChangeText={(text) => setEditJobLocation(text)}
                                style={STYLES.useredit}
                            />
                            <TextInput
                                placeholder="Company Name"
                                value={editJobCompanyName}
                                onChangeText={(text) => setEditJobCompanyName(text)}
                                style={STYLES.useredit}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <Text style={{ color: '#1229EE', fontSize: 20 }} onPress={saveEditedJob} >Save</Text>

                                <Text onPress={closeEditModal} style={{ fontSize: 20, marginLeft: 10, color: 'red' }}>close</Text>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default Postedjobs