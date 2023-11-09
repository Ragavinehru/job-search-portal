
import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';


const Viewcandidate = () => {
    const navigation = useNavigation();
    return (
        <ScrollView >
        <View style={{ width: '100%' }}>
        <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -3, }}> Back </Text>
                   
                </TouchableOpacity>
            <Text style={STYLES.profiledetails}>Candidates applied for your Job</Text>
        </View>
        </ScrollView>
    );
};


export default Viewcandidate;
