import { View, Text, TouchableOpacity, Image,Modal,TextInput,Button,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase'; 

import STYLES from '../styles';
const Jobdetails = ({ route }) => {
  const { jobData } = route.params;

  return (
    <ScrollView >
     <View style={{width:'100%'}}>
       {/* <Image style={{ width: '32%', height: '53%',marginTop:10 }} source={require('../assets/jobdetail.png')} />  */}

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{jobData.title}</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>{jobData.description}</Text>
      <Text style={{ fontSize: 16 }}>{jobData.location}</Text>
      <TouchableOpacity style={STYLES.cloudButton} >
                <Text style={STYLES.buttonText}>Apply now</Text>
            </TouchableOpacity>
            </View>
            
   </ScrollView>
  );
};

export default Jobdetails;
