import { View, Text, TouchableOpacity, ScrollView, Image, Modal, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';

const UserDashboard = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params?.userData;
    const userId = userData.userId;
    const [appliedJobsCount, setAppliedJobsCount] = useState(0);
    useEffect(() => {
        const fetchAppliedJobsCount = async () => {
            try {
                const { data, error } = await supabase
                    .from('jobs')
                    .select('id')
                    .contains('applied_users', [userId]);

                if (error) {
                    console.error('Error fetching applied jobs count:', error);
                } else {
                    setAppliedJobsCount(data.length);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchAppliedJobsCount();
    }, [userId]);

    return (
        <ScrollView >
            <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 3, marginTop: 23 }}> Back </Text>
                    {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
                </TouchableOpacity>
                <Text style={STYLES.profiledetails}>   UserDashboard</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={STYLES.carddashboard}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: 'white',
                            fontWeight: '800'
                        }}>Applied Jobs  </Text>
                        <Text style={{ fontSize: 66, alignSelf: 'center' }}> {appliedJobsCount}</Text>
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





export default UserDashboard;
