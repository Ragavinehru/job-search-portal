//import liraries
import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase, uploadFile } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';
import UserDashboard from './UserDashboard';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import { Alert } from 'react-native';
import WebView from 'react-native-webview';


const Userprofile = ({ route }) => {
  const navigation = useNavigation();
  const userData = route.params?.userData;
  const userId = global.userId;
  console.log('Global User profile screen ID:', userId);
  const favorites = route.params?.favorites;

  console.log("favour", favorites);
  const [isModalVisible, setModalVisible] = useState(false);

  const [userdetails, setuserdetails] = useState(userData);
  const [username, setusername] = useState('');
  const [usermobile, setuserMobile] = useState('');
  const [location, setlocaName] = useState('');
  const [useremail, setuserEmail] = useState('');

  const [resumemodal, setResumeModal] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [pdfurl, setpdfurl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleuserupdate = async () => {


    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: username,
          mobile: usermobile,
          location: location,
          email: useremail,
        })
        .eq('userId', userData.userId);
      console.log('Updated Data:', data, error);

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        console.log('Profile updated successfully');

        setuserdetails({
          ...userData,
          name: username,
          mobile: usermobile,
          location: location,
          email: useremail,
        });

        setModalVisible(false);

      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    setusername(userData.name);
    setuserMobile(userData.mobile);
    setlocaName(userData.location);
    setuserEmail(userData.email);
  }, [userData]);

  // const handleLogout = async () => {
  //   try {
  //     await supabase.auth.signOut();
  //     navigation.navigate('login');

  //   } catch (error) {
  //     console.error('Error during logout:', error.message);
  //   }
  // };


  // ...
  const openFilePicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('File picked:', result[0]);

      if (result.length > 0) {
        let filename = userId + ".pdf";
        console.log("hahah", filename)

        var FileInterface = {
          // fileName: result[0].name,
          fileName: filename,
          file: result[0],
        };

        console.log("FileInterface : ", FileInterface);

        const resume = await uploadFile(FileInterface);
        console.log("resume code", resume);
        const resumepath = resume.publicUrl;
        if (resumepath) {
          console.log("gggggggggggggggggg", resumepath)
          setResumeUrl(resumepath);
          Alert.alert("Success File uploaded")
          // setResumeModal(true);
        }
      }

    } catch (error) {
      console.error('Error during file selection:', error);
    }
  };

  console.log("resume path new", resumeUrl)



  const fetchResume = async () => {




    const filePath = `${userId}.pdf`;

    try {
      const { data: fileData, error: fileError } = await supabase
        .storage
        .from('job_portal')
        .createSignedUrl(filePath, 60);

      if (fileError) {
        console.error('Error fetching file:', fileError);
      } else {
        console.log('File data:', fileData);
        const resumeUri = fileData.signedUrl;
        console.log("resumemodalssssss", resumeUri);
        setpdfurl(resumeUri);
        console.log('Resume uriiii:', pdfurl);
      }

    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  useEffect(() => {

    fetchResume();
  }, []);



  return (

    <View style={{ marginTop: 100, marginLeft: 33 }}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 2, marginTop: -70 }}> Back </Text>

      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => setModalVisible(true)} style={{ fontSize: 20, fontWeight: 'bold', marginTop: -70, marginRight: 30, marginLeft: 'auto' }}>Edit Profile</Text>
      </TouchableOpacity>

      <Image style={{ width: '43%', height: '32%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} />
      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 7 }}>
        <Text style={STYLES.profiledetails}>Name: {userdetails.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
        <Text style={STYLES.profiledetails}>Email: {userdetails.email}</Text>
      </View>
      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
        <Text style={STYLES.profiledetails}>Mobile: {userdetails.mobile}</Text>
      </View>

      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
        <Text style={STYLES.profiledetails} >Location: {userdetails.location}</Text>
      </View>
      <TouchableOpacity onPress={() => {
        setResumeModal(true);
        fetchResume();
      }} style={{ marginTop: 15, marginLeft: -6 }} >
        <Text style={STYLES.registerText}>My Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 15, marginLeft: -6 }} >
        <Text onPress={() => navigation.navigate('Favour', {

          favorites: favorites,

        })} style={STYLES.registerText}>My Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 15, marginLeft: -6 }} >
        <Text onPress={() => navigation.navigate('UserDashboard', {
          userData: userData,

        })} style={STYLES.registerText}>My Dashboard</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={{ flexDirection: 'row', marginLeft: -76, marginTop: 120 }}>
        <Image style={{ width: 30, height: 30, marginLeft: 77, marginTop: 10 }} source={require('../assets/logout.png')} />
        <Text style={{ color: 'red', marginTop: 15 }}
          onPress={handleLogout}
        >Logout</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: -44, marginRight: 33 }}>
        <Image style={{ width: 30, height: 30, marginLeft: 77, marginTop: 10 }} source={require('../assets/upload.png')} />
        <Text style={{ color: COLORS.light, marginTop: 15 }}
          onPress={openFilePicker}
        >Upload</Text>
      </TouchableOpacity>



      <Modal visible={resumemodal} transparent={true}>
        {/* <WebView source={{ uri: "https://jmmmahusotnqiiyjmnnh.supabase.co/storage/v1/object/public/job_portal/9f7fee41-4c50-4ef4-b9de-eed27d8e6497.pdf" }} style={{ flex: 1 }} /> */}
        <View style={{ flex: 1, backfaceVisibility: 'pink' }}>
          <Text onPress={() => setResumeModal(false)} style={{ fontSize: 20, marginTop: 10, marginLeft: 10, color: COLORS.dark }}>Back</Text>
          <Pdf
            trustAllCerts={false}
            // source={{ uri: "https://jmmmahusotnqiiyjmnnh.supabase.co/storage/v1/object/public/job_portal/9f7fee41-4c50-4ef4-b9de-eed27d8e6497.pdf" }}
            source={{ uri: pdfurl }}

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
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }} />
        </View>

      </Modal>

      <Modal visible={isModalVisible}
        transparent={true}>

        <View style={STYLES.modaledit}>
          <Text style={{ marginRight: 159, marginLeft: 12, color: COLORS.dark }}>Name:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Name"
            value={username}
            onChangeText={(text) => setusername(text)}
          />
          <Text style={{ marginRight: 159, marginLeft: 12, color: COLORS.dark }}>Email:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Email"
            value={useremail}
            onChangeText={(text) => setuserEmail(text)}
          />
          <Text style={{ marginRight: 159, marginLeft: 12, color: COLORS.dark }}>Mobile:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Mobile"
            value={usermobile}
            onChangeText={(text) => setuserMobile(text)}
          />
          <Text style={{ marginRight: 159, marginLeft: 12, color: COLORS.dark }}>Location:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Location"
            value={location}
            onChangeText={(text) => setlocaName(text)}
          />

          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <Text style={{ color: 'black', fontSize: 15 }} onPress={handleuserupdate} >Update profile</Text>

            <Text onPress={() => setModalVisible(false)} style={{ fontSize: 15, marginLeft: 10, color: 'red' }}>close</Text>
          </View>
        </View>

      </Modal>


    </View >

  );
};





export default Userprofile;
