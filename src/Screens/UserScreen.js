import { View, Text, TouchableOpacity, Image,Modal, FlatList, ScrollView, TextInput,KeyboardAvoidingView  } from 'react-native'
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
    const [email, setEmail] = useState(''); // Define setEmail
    const [password, setPassword] = useState('');

    console.log("logged", loggeduserid)
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [filterSalary, setFilterSalary] = useState('');
    const [filterExperience, setFilterExperience] = useState('');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);

    const openFilterModal = () => {
        setFilterModalVisible(true);
    };
    
    const closeFilterModal = () => {
        setFilterModalVisible(false);
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
                <View style={{flexDirection:'row'}}>
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

            <TouchableOpacity onPress={() => navigation.navigate('userprofile', {
    userData: userData,
    setEmail: setEmail, 
    setPassword: setPassword,
})}>
                <Image style={STYLES.personuser} source={require('../assets/person.png')}></Image>
            </TouchableOpacity>

            <View style={{ marginLeft: 15, marginTop: -300 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22 }}>Hello!!</Text>

                </View>
                <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.light }}>
                    Find Your Perfect Job!
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={STYLES.search}
                        onChangeText={(text) => setSearchQuery(text)}
                        value={searchQuery} placeholder="Search"></TextInput>
                        <TouchableOpacity  onPress={openFilterModal}>
                    <Image style={{ width: '280%', height: 39, marginLeft: 10, marginTop: 20 }} source={require('../assets/filter.png')}></Image>
               </TouchableOpacity>
                </View>
              


            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isFilterModalVisible}
                onRequestClose={closeFilterModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{fontWeight:700,color:COLORS.dark}}>Filter Options</Text>
                        <View>
                        <TextInput
                           style={STYLES.registerText}
                            placeholder="Salary"
                            value={filterSalary}
                            onChangeText={(text) => setFilterSalary(text)}
                        />
                        <TextInput
                           style={STYLES.registerText}
                            placeholder="Experience"
                            value={filterExperience}
                            onChangeText={(text) => setFilterExperience(text)}
                        />
                </View>
                    <TouchableOpacity onPress={closeFilterModal}>
                        <Text style={{color:'red'}}>Close</Text>
                    </TouchableOpacity>
               </View>
               </View>
            </Modal>


                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                />
            
        </ScrollView>
        // </KeyboardAvoidingView>
    )
}

export default UserScreen