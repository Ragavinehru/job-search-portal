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
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  
  useEffect(() => {
    const checkIfAlreadyApplied = async () => {
      try {
        const { data: jobRecord, error: fetchError } = await supabase
          .from('jobs')
          .select('applied_users')
          .eq('id', JobId);

        if (fetchError) {
          console.error('Error fetching job data:', fetchError);
          return;
        }

        const existingAppliedUsers = jobRecord[0].applied_users || [];

        if (existingAppliedUsers.includes(profileid)) {
          setAlreadyApplied(true);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    checkIfAlreadyApplied();
  }, [profileid, JobId]);

  const applyForJob = async () => {
    if (alreadyApplied) {
     
      Alert.alert('Already Applied', 'You have already applied for this job.');
    } else {
      try {
        const { data: jobRecord, error: fetchError } = await supabase
          .from('jobs')
          .select('applied_users')
          .eq('id', JobId);

        if (fetchError) {
          console.error('Error fetching job data:', fetchError);
          return;
        }

        const existingAppliedUsers = jobRecord[0].applied_users || [];
        existingAppliedUsers.push(profileid);

        const { data: updatedData, error: updateError } = await supabase
          .from('jobs')
          .update({ applied_users: existingAppliedUsers })
          .eq('id', JobId);

        if (updateError) {
          console.error('Error applying for the job:', updateError);
        } else {
          console.log('Applied for the job successfully.', updatedData);
          setAlreadyApplied(true);
          
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
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
            <Text style={STYLES.buttonText}>{alreadyApplied ? 'Applied' : 'Apply now'}</Text>
          </TouchableOpacity>
          {alreadyApplied && (
            <Text style={{ fontSize: 16, color: 'green', marginTop: 10 }}>
              You have applied for this job!.
            </Text>
          )}
        </View>


      </View>

    </ScrollView>
  );
};

export default Jobdetails;
