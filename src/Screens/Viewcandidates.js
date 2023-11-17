import { View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';

// import { Pdf } from 'react-native-pdf';
import { Pdf, RnImageViewer } from 'react-native-pdf';
import { storage } from 'supabase';
import { Linking } from 'react-native';
import { ToastAndroid, Platform} from 'react-native';







const Viewcandidate = () => {
  const navigation = useNavigation();
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [viewingResume, setViewingResume] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);
  const [resumeError, setResumeError] = useState(null);

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

      // Update applied_users_status  adding user ID and status
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
      // Fetch the current applied_users_status value
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
  const [resumeModalVisible, setResumeModalVisible] = useState(false);

  const openResumeModal = async (userId, filename) => {
    try {
      setViewingResume(true); // Set this state to true to trigger the rendering of the modal
      setLoadingResume(true);

      // Download the resume file
      const { data, error } = await supabase.storage
        .from('job_portal')
        .download(`${userId}/${filename}`);

      if (error) {
        console.error('Error fetching resume:', error);
        setResumeError('Error fetching resume. Please try again.');
      } else if (!data) {
        console.error('Resume data is null or undefined.');
        setResumeError('Resume data is null or undefined.');
      } else {
        // Set the resume data to be displayed in the modal
        setResumeData({
          data: `data:application/pdf;base64,${data}`,
          type: 'application/pdf',
        });
      }
    } catch (error) {
      console.error('Error during resume retrieval:', error.message);
      setResumeError('Error during resume retrieval. Please try again.');
    } finally {
      setLoadingResume(false);
    }
  };
  // const viewResume = async (userId, filename) => {
  //   try {
  //     // Check if the file exists in storage
  //     const { data, error } = await supabase.storage
  //       .from('job_portal')
  //       .getMetadata(`${userId}/${filename}`);

  //     if (error) {
  //       console.error('Error checking file existence:', error);
  //       setResumeError('Error checking file existence. Please try again.');
  //     } else if (!data) {
  //       console.error('File does not exist.');
  //       setResumeError('File does not exist.');
  //     } else {
  //       // File exists, download the resume
  //       downloadResume(userId, filename);
  //     }
  //   } catch (error) {
  //     console.error('Error during file existence check:', error.message);
  //     setResumeError('Error during file existence check. Please try again.');
  //   }
  // };


  // const openResume = async (userId, filename) => {

  //   try {
  //     setLoadingResume(true); // Set loading indicator

  //     // Download the resume file
  //     const { data, error } = await supabase.storage
  //       .from('job_portal')
  //       .download(`${userId}/${filename}`);

  //     if (error) {
  //       console.error('Error fetching resume:', error);
  //       setResumeError('Error fetching resume. Please try again.');
  //     } else if (!data) {
  //       console.error('Resume data is null or undefined.');
  //       setResumeError('Resume data is null or undefined.');
  //     } else {
  //       // Display the resume
  //       if (Platform.OS === 'ios') {
  //         // On iOS, open the file in Safari
  //         Linking.openURL(`data:application/pdf;base64,${data}`);
  //       } else {
  //         // On Android, use a PDF viewer app if available, or download and open in default viewer
  //         Linking.openURL(`data:application/pdf;base64,${data}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error during resume retrieval:', error.message);
  //     setResumeError('Error during resume retrieval. Please try again.');
  //   } finally {
  //     setLoadingResume(false);
  //   }
  // };

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
                        onPress={() => openResumeModal(appliedUserId, `${appliedUserId}.pdf`)}
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
      {viewingResume && (
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
        )}
      </View>
    </ScrollView >
  );
};

export default Viewcandidate;
