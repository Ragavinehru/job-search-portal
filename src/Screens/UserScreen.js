import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../colors/color';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const UserScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params?.userData;
    const loggeduserid = userData.userId;
    console.log("logged", loggeduserid)
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);


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
    console.log("jobData", jobs)

    useEffect(() => {
        const filteredData = jobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredJobs(filteredData);
    }, [searchQuery, jobs]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ marginTop: 8 }}
            onPress={() => navigation.navigate('jobdetails', { jobData: item, profileid: loggeduserid })}
        >

            <View style={STYLES.card}>
                <Text style={STYLES.jobTitle}>{item.title}</Text>
                <Text style={STYLES.jobDescription}>{item.description}</Text>
                <Text style={STYLES.jobDescription}>{item.location}</Text>
                <TouchableOpacity>
                    <Image style={{ height: 20, marginLeft: 'auto', width: 20 }} source={require('../assets/heart.png')} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
    const isLoading = jobs.length === 0;

    return (
        <ScrollView style={{ width: '100%', height: '100%' }}>
            <TouchableOpacity onPress={navigation.goBack}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12, marginTop: 10 }}> Back </Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('userprofile', { userData: userData })}>
                <Image style={STYLES.personuser} source={require('../assets/person.png')}></Image>
            </TouchableOpacity>

            <View style={{ marginLeft: 15, marginTop: -290 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22 }}>Hello!!</Text>

                </View>
                <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.light }}>
                    Grab your Opportunity!
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={STYLES.search}
                        onChangeText={(text) => setSearchQuery(text)}
                        value={searchQuery} placeholder="Search"></TextInput>
                    <Image style={{ width: '10%', height: 50, marginLeft: 10, marginTop: 10 }} source={require('../assets/filter.png')}></Image>
                </View>


            </View>
            <View style={{ marginVertical: 30 }}>
                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </ScrollView>
    )
}

export default UserScreen