import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';


const Postedjobs = () => {
    const route = useRoute();
    // const empdetails = employerData;
    const employerData = route.params?.employerData;
    const employerid = employerData.userId;
    const navigation = useNavigation();

    const [postedJobs, setPostedJobs] = useState([]);
    console.log("hhhhhhh", employerid)
    
    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('employer_id', employerid);

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
    }, [employerid]);

    // const fetchAppliedUsersForJob = async (job) => {
    //     const { data, error } = await supabase
    //         .from('jobs')
    //         .select('applied_users')
    //         .eq('id', job.id);

    //     if (error) {
    //         console.error('Error fetching applied users for job:', error);
    //         return { applied_users: [] };
    //     } else {
    //         return data[0] || { applied_users: [] };
    //         // console.log('Error fetching applied users for job:', data);
    //     }
    // };

   
    // const fetchUserDetails = async (userId) => {
    //     const { data, error } = await supabase
    //         .from('users')
    //         .select('name, email')
    //         .eq('id', userId);

    //     if (error) {
    //         console.error('Error fetching user details:', error);
    //         return { name: '', email: '' };
    //     } else {
    //         return data[0];
    //     }
    // };

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
                            <Text style={STYLES.jobDescription}>{item.title}</Text>
                            <Text style={STYLES.jobDescription}>{item.description}</Text>
                            {/* {fetchUserDetails(item).applied_users.map(async (userId) => {
                                const userDetails = await fetchUserDetails(userId);
                                return (
                                    <View key={userId}>
                                        <Text style={STYLES.jobDescription}>{userDetails.name}</Text>
                                        <Text style={STYLES.jobDescription}>{userDetails.email}</Text>
                                    </View>
                                );
                            })} */}
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default Postedjobs