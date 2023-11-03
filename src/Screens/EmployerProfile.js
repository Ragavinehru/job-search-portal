import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const EmployerProfile = () => {
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {

        async function fetchUserDetails() {
            const { data, error } = await supabase.auth.user();

            if (error) {
                console.error('Error fetching user details:', error.message);
            } else {
                setUserDetails(data);
            }
        }

        fetchUserDetails();
    }, []);

    return (
        <View style={{ marginTop: 100, marginLeft: 33 }}>
            <TouchableOpacity onPress={navigation.goBack}>
                {/* <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} /> */}
                {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -12, marginTop: -60 }}> Back </Text>
                <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', fontSize: 33, marginTop: 12 }}>
                <Text>Name:</Text>
                <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
                <Text>Email:</Text>
                <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
                <Text>Mobile:</Text>
                <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
                <Text>Company:</Text>
                <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
                <Text>Location:</Text>
                <Text></Text>
            </View>
        </View>

    )
}

export default EmployerProfile
