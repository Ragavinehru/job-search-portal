import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';
import STYLES from '../styles';
import COLORS from '../colors/color';
const Jobdetails = ({ route }) => {
  const navigation = useNavigation();
  const { jobData } = route.params;

  const getCurrentUser = () => {
    return supabase.auth.user();
  };

  const applyForJob = async () => {
    console.log("apply")
    // const { user, session, error } = supabase.auth.api.getUser(); // Retrieve the user using getUser().
    // console.log("user", user)
    // const user = supabase.auth.user();
    // console.log("userapplyyyyyyyyy", user)

    try {
      console.log("try")
      // const session = supabase.auth.session();
      // const user = session.user;
      const user = getCurrentUser();
      const { data, error } = await supabase
        .from('jobs')
        .update({
          applied_users: supabase.fn('arrayAppend', [user.id], { skipDuplicates: true })
        })
        .eq('id', jobData.id);

      if (error) {
        console.error('Error applying for the job:', error);
      } else {
        console.log('Applied for the job successfully.', data);
        // You can add additional logic here, such as displaying a confirmation message.
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  return (
    <ScrollView style={{ width: '100%' }}>
      <View >
        <TouchableOpacity onPress={navigation.goBack}>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12, marginTop: 10 }}> Back </Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 50 }}>
          <Image style={{ width: '20%', height: '30%', marginLeft: 30 }} source={require('../assets/jobdetail.png')} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: '35%', marginTop: -60 }}>{jobData.title}</Text>

          <Text style={{ fontSize: 16, marginLeft: '35%' }}>{jobData.location}</Text>
          <View style={STYLES.line}></View>
        </View>


        <View style={{ marginVertical: '100%', marginTop: -90, paddingLeft: 26, }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.dark }}>Job Description</Text>
          <Text style={{ fontSize: 16, marginVertical: 10 }}>{jobData.description}</Text>
          <Text style={{ fontSize: 19, fontWeight: '400' }}>Experience: {jobData.experience}</Text>
          <Text style={{ fontSize: 16, color: COLORS.dark, marginTop: 10 }}>Package: {jobData.package}</Text>
          <Text style={{ fontSize: 16, color: COLORS.dark, marginTop: 10 }}>Openings: {jobData.openings}</Text>
          <Text style={{ fontSize: 16, color: COLORS.dark, marginTop: 10 }}>Education: {jobData.education}</Text>
          <Text style={{ fontSize: 16, color: COLORS.dark, marginTop: 10 }}>Skills: {jobData.skills}</Text>
          {/* <Text style={{ fontSize: 16 }}>{jobData.contact}</Text> */}
          <TouchableOpacity style={STYLES.cloudButton} onPress={applyForJob}>
            <Text style={STYLES.buttonText}>Apply now</Text>
          </TouchableOpacity>
        </View>


      </View>

    </ScrollView>
  );
};

export default Jobdetails;
