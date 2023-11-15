import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';



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
        console.log("rrrrrrrrrrrh",jobId)
        try {
          // Use Supabase to delete the job from the database
          await supabase.from('jobs').delete().eq('id', jobId);
      
          // Update the state after successful deletion
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
            // Use Supabase to update the job details in the database
            await supabase
                .from('jobs')
                .update([
                    {
                        id: editJobId,
                        title: editJobTitle,
                        location: editJobLocation,
                        company_name: editJobCompanyName,
                    },
                ]);

            // Close the edit modal
            closeEditModal();
            console.log('Job edited successfully');
        } catch (error) {
            console.error('Error editing posted job:', error);
        }
    };


    return (
        <ScrollView >
            <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -3, }}> Back </Text>
                    {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
                </TouchableOpacity>
                <Text style={STYLES.profiledetails}>   Posted Jobs</Text>
                <FlatList
                    data={postedJobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={STYLES.cardposted}>
                            <TouchableOpacity onPress={() => deletePostedJob(item.id)}>
                <Image style={{ width: 19, height: 19, marginLeft: 'auto' }} source={require('../assets/delete.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(item.id, item.title, item.location, item.company_name)}>
                                <Image style={{ width: 19, height: 19, marginLeft: 'auto',marginTop:16 }} source={require('../assets/edit.png')} />
                            </TouchableOpacity>
                            <Text style={STYLES.postedjob}>{item.title}</Text>
                            <Text style={STYLES.jobDescription}> Location: {item.location}</Text>
                            <Text style={STYLES.jobDescription}>Company Name: {item.company_name}</Text>
                        </View>
                    )}
                />
          <Modal
                    visible={isEditModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeEditModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
                            <Text>Edit Job</Text>
                            <TextInput
                                placeholder="Title"
                                value={editJobTitle}
                                onChangeText={(text) => setEditJobTitle(text)}
                            />
                            <TextInput
                                placeholder="Location"
                                value={editJobLocation}
                                onChangeText={(text) => setEditJobLocation(text)}
                            />
                            <TextInput
                                placeholder="Company Name"
                                value={editJobCompanyName}
                                onChangeText={(text) => setEditJobCompanyName(text)}
                            />
                            <Button title="Save" onPress={saveEditedJob} />
                            <Button title="Cancel" onPress={closeEditModal} />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default Postedjobs