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
    console.log("hhhhhhh", employerid)
    const [postedJobs, setPostedJobs] = useState([]);
    const [postedJobDetails, setPostedJobDetails] = useState([]);

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



    useEffect(() => {
        // When postedJobs are available, map and fetch applied users for each job
        if (postedJobs.length > 0) {
            Promise.all(postedJobs.map(async (job) => {
                const appliedUsers = await fetchAppliedUsersForJob(job);
                return { job, applied_users: appliedUsers };
            })).then((details) => {
                setPostedJobDetails(details);
            });
        }
    }, [postedJobs]);

    const fetchAppliedUsersForJob = async (job) => {
        const { data, error } = await supabase
            .from('jobs')
            .select('applied_users')
            .eq('id', job.job.id);

        if (error) {
            console.error('Error fetching applied users for job:', error);
            return [];
        } else {
            const appliedUsers = data[0]?.applied_users || [];
            console.log("yyyyyyyyyyyyyyyyyyyyyyy", appliedUsers)
            console.log(`Fetched applied users for job ${job.job.id}:`, appliedUsers);
            return appliedUsers;
        }
    };
    console.log("hahahha");


    //delete the job 
    const deletePostedJob = async (jobId) => {
        try {
            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', jobId);

            if (error) {
                console.error('Error deleting posted job:', error);
            } else {

                setPostedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
            }
        } catch (error) {
            console.error('Error:', error.message);
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
                            <Text style={STYLES.postedjob}>{item.title}</Text>
                            <Text style={STYLES.jobDescription}> Location: {item.location}</Text>
                            <Text style={STYLES.jobDescription}>Company Name: {item.company_name}</Text>
                            {/* {item.applied_users && item.applied_users.map((userId) => (
                                <UserDetails key={userId} userId={userId} />
                            ))} */}
                            {/* {item.applied_users.map((userId) => (
                                <UserDetails key={userId} userId={userId} />
                            ))} */}
                            {postedJobDetails.length > 0 && (
                                <View>
                                    <Text>Applied Users:</Text>
                                    {postedJobDetails
                                        .find((details) => details.job.id === item.id)
                                        ?.applied_users.map((userId) => (
                                            <Text key={userId}>{userId}</Text>
                                        ))}
                                </View>
                            )}
                        </View>
                    )}
                />

            </View>
        </ScrollView>
    );
};

export default Postedjobs