import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../colors/color';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const UserScreen = () => {
    const navigation = useNavigation();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        async function fetchJobs() {
            const { data, error } = await supabase
                .from('jobs')
                .select('*');

            if (error) {
                console.error('Error fetching job data:', error.message);
                return;
            }

            setJobs(data);
        }

        fetchJobs();
    }, []);
    const renderItem = ({ item }) => (
        <View style={STYLES.card}>
            <Text style={STYLES.jobTitle}>{item.title}</Text>
            <Text style={STYLES.jobDescription}>{item.description}</Text>
            <Text style={STYLES.jobDescription}>{item.location}</Text>
            <TouchableOpacity>
                <Image style={{ height: 20, marginLeft: 'auto', width: 20 }} source={require('../assets/heart.png')}></Image>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity onPress={navigation.goBack}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12, marginTop: 10 }}> Back </Text>

            </TouchableOpacity>
            <View style={{ marginLeft: 15, marginTop: 55 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22 }}>Hello!!</Text>

                </View>
                <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.light }}>
                    Over 5000 jobs  are waiting for you
                </Text>
                {/* <TouchableOpacity onPress={() => navigation.navigate('empprofile')}>
                    <Image style={STYLES.person} source={require('../assets/person.png')}></Image>
                </TouchableOpacity> */}


            </View>
            <FlatList
                data={jobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </ScrollView>
    )
}

export default UserScreen