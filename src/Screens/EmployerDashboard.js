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

    useEffect(() => {
        const fetchPostedJobsCount = async () => {
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('id')
                    .eq('employer_id', employerId);

                if (error) {
                    console.error('Error fetching posted jobs count:', error);
                } else {
                    setPostedJobsCount(data.length);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchPostedJobsCount();
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
                            fontWeight: '800'
                        }}>Shortlisted </Text>
                        <Text style={{ fontSize: 66, alignSelf: 'center' }}> 0</Text>
                    </View>
                </View>
                <View style={STYLES.carddashboard}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        color: 'white',
                        fontWeight: '800'
                    }}>Rejected </Text>
                    <Text style={{ fontSize: 66, alignSelf: 'center' }}> 0</Text>
                </View>
            </View>
        </ScrollView>
    );
};


export default EmpDashboard;
