import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';

// create a component
const EmpDashboard = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const employerData = route.params?.employerData;
    const employerId = employerData.userId;
    const [postedJobsCount, setPostedJobsCount] = useState(0);
    const [shortlistedCount, setShortlistedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch posted jobs count
                const { data: postedJobsData, error: postedJobsError } = await supabase
                    .from('jobs')
                    .select('id')
                    .eq('employer_id', employerId);

                if (postedJobsError) {
                    console.error('Error fetching posted jobs count:', postedJobsError);
                } else {
                    setPostedJobsCount(postedJobsData.length);
                }

                // Fetch shortlisted data
                const { data: shortlistedData, error: shortlistedError } = await supabase
                    .from('jobs')
                    .select('applied_users_status')
                    .eq('employer_id', employerId);

                if (shortlistedError) {
                    console.error('Error fetching shortlisted data:', shortlistedError);
                } else {
                    let totalCount = 0;

                    // Iterate through each item in the array
                    shortlistedData.forEach(item => {
                        const shortlistedUsers = item.applied_users_status || {};
                        totalCount += Object.values(shortlistedUsers).filter(status => status === 'shortlisted').length;
                    });

                    setShortlistedCount(totalCount);
                    console.log("shortttttt", shortlistedCount)
                }

                // Fetch rejected data
                const { data: rejectedData, error: rejectedError } = await supabase
                    .from('jobs')
                    .select('applied_users_status')
                    .eq('employer_id', employerId);

                if (rejectedError) {
                    console.error('Error fetching rejected data:', rejectedError);
                } else {
                    let totalCount = 0;

                    // Iterate through each item in the array
                    rejectedData.forEach(item => {
                        const rejectedUsers = item.applied_users_status || {};
                        totalCount += Object.values(rejectedUsers).filter(status => status === 'rejected').length;
                    });

                    setRejectedCount(totalCount);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [employerId]);

    return (
        <ScrollView >
            <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 3, marginTop: 23 }}> Back </Text>
                    {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
                </TouchableOpacity>
                <Text style={STYLES.profiledetails}>   Employer Dashboard</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={STYLES.carddashboard}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: 'white',
                            fontWeight: '800'
                        }}>Posted Jobs  </Text>
                        <Text style={{ fontSize: 66, alignSelf: 'center' }}>{postedJobsCount}</Text>
                    </View>
                    <View style={STYLES.carddashboard}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: 'white',
                            fontWeight: '800',
                        }}>Shortlisted </Text>
                        <Text style={{ fontSize: 66, alignSelf: 'center' }}> {shortlistedCount}</Text>
                    </View>
                </View>
                <View style={STYLES.carddashboard}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        color: 'white',
                        fontWeight: '800',
                    }}>Rejected </Text>
                    <Text style={{ fontSize: 66, alignSelf: 'center' }}> {rejectedCount}</Text>
                </View>
            </View>
        </ScrollView>
    );
};


export default EmpDashboard;
