import { View, Text, TouchableOpacity,ScrollView, Image, Modal, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';

const UserDashboard = () => {
    const navigation = useNavigation();
    return (
        <ScrollView >
        <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={navigation.goBack}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -3, }}> Back </Text>
                {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
            </TouchableOpacity>
            <Text style={STYLES.profiledetails}>   UserDashboard</Text>

            </View>
            </ScrollView>
    );
};





export default UserDashboard;
