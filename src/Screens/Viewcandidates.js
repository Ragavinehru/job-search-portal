import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';

// import { Pdf } from 'react-native-pdf';
import Pdf from 'react-native-pdf';

import { ToastAndroid, Platform } from 'react-native';







const Viewcandidate = () => {
  const navigation = useNavigation();
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedUsers, setAppliedUsers] = useState([]);

  const [resumepdfurl, setresumepdfurl] = useState('');
  const [resumeuser, setResumeuserModal] = useState(false);

  const userId = global.userId;
  console.log('Global view id:', userId);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('employer_id', userId);

        if (error) {
          console.error('Error fetching posted jobs:', error);
        } else {
          setPostedJobs(data);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchPostedJobs();
  }, [userId]);

  useEffect(() => {

    const fetchAppliedUsers = async () => {
      try {
        const appliedUserIds = postedJobs
          .filter((job) => job.applied_users && job.applied_users.length > 0)
          .map((job) => job.applied_users)
          .flat();

        if (appliedUserIds.length > 0) {
          const { data, error } = await supabase
            .from('users')
            .select('userId, name, email')
            .in('userId', appliedUserIds);

          console.log("applied ", data)

          if (error) {
            console.error('Error fetching applied users:', error);
          } else {
            setAppliedUsers(data);
            console.log("applied users++++++= ", appliedUsers)
          }
        } else {
          console.log('No applied users found for the given jobs.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchAppliedUsers();
  }, [postedJobs]);

  const handleShortlist = async (jobId, userId) => {
    try {

      const { data: jobData, error } = await supabase
        .from('jobs')
        .select('applied_users_status')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Error fetching job data:', error);
        return;
      }

      const currentStatus = jobData.applied_users_status || {};


      const newStatus = {
        ...currentStatus,
        [userId]: 'shortlisted',
      };

      await supabase
        .from('jobs')
        .update({ applied_users_status: newStatus })
        .eq('id', jobId);

      ToastAndroid.show("shorlisted", ToastAndroid.LONG)

      console.log("shorlisted")
    } catch (error) {
      console.error('Error shortlisting user:', error);
    }
  };

  const handleReject = async (jobId, userId) => {
    try {

      const { data: jobData, error } = await supabase
        .from('jobs')
        .select('applied_users_status')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Error fetching job data:', error);
        return;
      }

      const currentStatus = jobData.applied_users_status || {};


      const newStatus = {
        ...currentStatus,
        [userId]: 'rejected',
      };

      await supabase
        .from('jobs')
        .update({ applied_users_status: newStatus })
        .eq('id', jobId);


      ToastAndroid.show("", ToastAndroid.LONG)
      console.log("rejected")
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };


  //_#####################

  const viewResume = async (userId) => {
    try {

      const filename = `${userId}.pdf`;
      console.log("filename view resume", filename)

      const { data: viewresume, error } = await supabase.storage
        .from('job_portal')
        .createSignedUrl(filename, 60);


      if (error) {
        console.error('Error checking file existence:', error);

      } else {
        console.log('File data view resume:', viewresume);
        const viewresumeurl = viewresume.signedUrl;
        console.log("resume view resume", viewresumeurl);
        setresumepdfurl(viewresumeurl);
        console.log('Resume view pdf:', resumepdfurl);

      }
    } catch (error) {
      console.error('Error during file existence check:', error.message);

    }
  };
  useEffect(() => {

    viewResume();
  }, []);
  console.log('Resume view pdf outside:', resumepdfurl);

  return (
    <ScrollView>
      <View style={{ width: '100%' }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -3 }}> Back </Text>
        </TouchableOpacity>
        <Text style={STYLES.profiledetails}>Candidates applied for your Job</Text>

        <FlatList
          data={postedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ ...STYLES.cardposted, width: '86%' }}>
              <Text style={STYLES.postedjob}>{item.title}({item.location})</Text>

              {/* <Text style={{ fontWeight: 200, color: COLORS.dark }}>Applied users:</Text> */}
              {/* <Text style={STYLES.jobDescription}> users:</Text> */}
              {item.applied_users &&
                item.applied_users.map((appliedUserId) => {
                  console.log("appliedUserId", appliedUserId);


                  const user = appliedUsers.find((u) => String(u.userId) === appliedUserId) || {};
                  console.log("user", user);

                  return (
                    <View key={appliedUserId}>
                      <Text style={{ ...STYLES.jobDescription, marginTop: 15 }}>Name: {user.name || 'Unknown User'}</Text>
                      <Text style={STYLES.jobDescription}>Contact: {user.email || 'Unknown Email'}</Text>
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}

                        onPress={() => {

                          viewResume(appliedUserId);
                          setResumeuserModal(true);
                        }}
                      >
                        <Image
                          style={{ width: 25, height: 25, marginTop: -39, marginLeft: 'auto' }}
                          source={require('../assets/upload.png')}
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => viewResume(appliedUserId, 'jpeg')}
                      >
                        <Image
                          style={{ width: 25, height: 25, marginTop: -30, marginLeft: 'auto' }}
                          source={require('../assets/upload.png')}
                        />
                      </TouchableOpacity> */}
                      <View style={{ flexDirection: 'row', marginTop: 3, alignSelf: 'center' }}>
                        <TouchableOpacity style={STYLES.shortButton}
                          onPress={() => handleShortlist(item.id, appliedUserId)}>
                          <Text style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                          }} >Shorlist</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ ...STYLES.shortButton, marginLeft: 12, backgroundColor: '#EE4B2B' }}
                          onPress={() => handleReject(item.id, appliedUserId)}>
                          <Text style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                          }}  >Reject</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={STYLES.appliedline}></View>
                    </View>
                  );
                })}
            </View>
          )}
        />
        <Modal visible={resumeuser} transparent={true}>

          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text onPress={() => setResumeuserModal(false)} style={{ fontSize: 20, marginTop: 10, marginLeft: 10, color: COLORS.dark }}>Back</Text>
            {resumepdfurl ? (
              <Pdf
                trustAllCerts={false}

                source={{ uri: resumepdfurl }}

                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }} />
            ) : (
              <Text>Loading PDF...</Text>
            )}
          </View>

        </Modal>





        {/* {viewingResume && (
          // Modal for displaying the resume
          <Modal
            visible={resumeModalVisible}
            onRequestClose={() => setResumeModalVisible(false)}
          >
            <View style={{ flex: 1 }}>
              {loadingResume ? (
                <Text>Loading resume...</Text>
              ) : resumeError ? (
                <Text style={{ color: 'red' }}>{resumeError}</Text>
              ) : (
                // Use conditional rendering based on the file type
                resumeData && resumeData.type === 'application/pdf' ? (
                  <Pdf
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    source={{ uri: resumeData.data, cache: true }}
                  />
                ) : (
                  <RnImageViewer
                    imageUrls={[{ url: resumeData.data }]}
                    enableSwipeDown
                    renderIndicator={() => null}
                    onSwipeDown={() => setResumeModalVisible(false)}
                  />
                ))}
            </View>
          </Modal>
        )} */}
      </View>
    </ScrollView >
  );
};

export default Viewcandidate;
