import { View, Text, TouchableOpacity, Image, Modal, FlatList, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
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
    const [filterSalary, setFilterSalary] = useState('');
    const [filterExperience, setFilterExperience] = useState('');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    // const isAlphaNumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);

    const filterJobs = () => {
        let filteredData = [...jobs];

        if (filterSalary) {
            const alphanumericPattern = /^[a-zA-Z0-9]+$/;
            filteredData = filteredData.filter((job) => alphanumericPattern.test(job.package));
        }

        if (filterExperience) {
            const alphanumericPattern = /^[a-zA-Z0-9]+$/;
            filteredData = filteredData.filter((job) => alphanumericPattern.test(job.experience));
        }

        setFilteredJobs(filteredData);
    };


    const openFilterModal = () => {
        setFilterModalVisible(true);
    };

    const closeFilterModal = () => {
        setFilterModalVisible(false);
    };

    const sortJobsByPackage = () => {
        const sortedJobs = [...jobs];
        sortedJobs.sort((a, b) => {
            // Extract numeric part from the "Package" field and compare
            const numericPackageA = parseInt(a.package, 10);
            const numericPackageB = parseInt(b.package, 10);
            return numericPackageA - numericPackageB;
        });
        setJobs(sortedJobs);
        filterJobs();
    };


    const sortJobsByExperience = () => {
        const sortedJobs = [...jobs];
        sortedJobs.sort((a, b) => {
            // Convert experience to numbers for comparison
            const experienceA = parseInt(a.experience, 10);
            const experienceB = parseInt(b.experience, 10);
            return experienceA - experienceB; // Sort in ascending order
        });
        setJobs(sortedJobs);
        filterJobs();
    };


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

        <TouchableOpacity
            onPress={() => navigation.navigate('jobdetails', { jobData: item, profileid: loggeduserid })}
        >

            <View style={STYLES.card}>
                <Text style={STYLES.jobTitle}>{item.title}</Text>
                <Text style={STYLES.jobDescription}>{item.description}</Text>
                <Text style={STYLES.jobDescription}>{item.location}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={STYLES.jobDescription}>Experience: {item.experience}</Text>
                    <Text style={STYLES.jobDpackage}>Package: {item.package}</Text>
                </View>
                <TouchableOpacity>
                    <Image style={{ height: 20, marginLeft: 'auto', width: 20 }} source={require('../assets/heart.png')} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    );


    return (
        //     <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        <ScrollView style={{ width: '100%' }}>
            <TouchableOpacity onPress={navigation.goBack}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12, marginTop: 10 }}> Back </Text>

            </TouchableOpacity>





            <View style={{ marginLeft: 15, position: 'absolute', marginTop: 70 }}>

                <Text style={{ fontSize: 22 }}>Hello!!</Text>
                <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.light }}>
                    Find Your Perfect Job!
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('userprofile', {
                    userData: userData,

                })}>
                    <Image style={STYLES.personuser} source={require('../assets/person.png')}></Image>

                </TouchableOpacity>





            </View>
            <View style={{ flexDirection: 'row', marginTop: 100, marginLeft: 12 }}>
                <TextInput style={STYLES.search}
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery} placeholder="Search"></TextInput>
                <TouchableOpacity onPress={openFilterModal}>
                    <Image style={{ width: '280%', height: 39, marginLeft: 10, marginTop: 20 }} source={require('../assets/filter.png')}></Image>
                </TouchableOpacity>
            </View>
            <Modal
                style={{ padding: 10 }}
                animationType="slide"
                transparent={true}
                visible={isFilterModalVisible}
                onRequestClose={closeFilterModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontWeight: '700', color: COLORS.dark }}>Sort by</Text>
                        <TouchableOpacity
                            onPress={() => {
                                closeFilterModal();
                                sortJobsByPackage();

                            }}
                        >
                            <Text style={STYLES.registerText}>Salary (Low to High)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                closeFilterModal();
                                sortJobsByExperience();

                            }}
                        >
                            <Text style={STYLES.registerText}>Experience (Low to High)</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeFilterModal}>
                            <Text style={{ color: 'red', alignSelf: 'center' }}>Close</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </Modal >


            <FlatList
                data={filteredJobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                keyboardShouldPersistTaps="handled"
            />

        </ScrollView >
        // </KeyboardAvoidingView>
    )
}

export default UserScreen