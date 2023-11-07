import { View, Text, TouchableOpacity,Alert, Image, Modal, TextInput, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';
import STYLES from '../styles';
import COLORS from '../colors/color';

const Jobdetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const jobData = route.params?.jobData;
  const profileid = route.params?.profileid;
  console.log("id",profileid)
  const JobId = jobData.id;
  console.log("id for joddata",JobId);
  // const getCurrentUser = () => {
  //   return supabase.auth.user();
  // };

  const applyForJob = async (userId,JobId) => {
    try {
      console.log("id for joddata ",JobId);
      // Fetch the existing data from the job record
      const { data: jobRecord, error: fetchError } = await supabase
        .from('jobs')
        .select('applied_users')
        .eq('id', JobId);
  
      if (fetchError) {
        console.error('Error fetching job data:', fetchError);
        return;
      }
  
      // Extract the existing applied_users array
      const existingAppliedUsers = jobRecord[0].applied_users || [];
  
      // Append the userId to the array
      existingAppliedUsers.push(userId);
  
      // Update the job record with the modified applied_users array
      const { data: updatedData, error: updateError } = await supabase
        .from('jobs')
        .update({ applied_users: existingAppliedUsers })
        .eq('id', JobId);
  
      if (updateError) {
        console.error('Error applying for the job:', updateError);
      } else {
        console.log('Applied for the job successfully.', updatedData);
        Alert.alert('Applied Job Successful');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  // Call applyForJob(userId) with the user's ID to add them to the applied_users array.
  
  
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
          <TouchableOpacity style={STYLES.cloudButton} onPress={() => applyForJob(userId, JobId)}>
            <Text style={STYLES.buttonText}>Apply now</Text>
          </TouchableOpacity>
        </View>


      </View>

    </ScrollView>
  );
};

export default Jobdetails;
