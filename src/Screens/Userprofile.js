//import liraries
import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';
import UserDashboard from './UserDashboard';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';




const Userprofile = ({ route }) => {
  const navigation = useNavigation();
  const userData = route.params?.userData;
  const favorites = route.params?.favorites;

console.log("favour",favorites);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userdetails, setuserdetails] = useState(userData);
  const [username, setusername] = useState('');
  const [usermobile, setuserMobile] = useState('');
  const [location, setlocaName] = useState('');
  const [useremail, setuserEmail] = useState('');

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.navigate('login');

    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // const openFilePicker = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPickerUtil.allFiles()],
  //     });

  //     if (result) {
  //       // The 'result' object contains information about the selected file.
  //       const { uri, type, name, size } = result;

  //       // You can now upload the file to Supabase or your server.

  //       // For Supabase, you can use the storage API to upload the file.
  //       // Replace 'YOUR_BUCKET' with the actual name of your bucket in Supabase.
  //       const { data, error } = await supabase.storage
  //         .from('job_portal')
  //         .upload(`resumes/${userData.userId}/${name}`, uri);

  //       if (error) {
  //         console.error('Error uploading the file:', error.message);
  //       } else {
  //         // The file is successfully uploaded, and 'data.Key' contains the file path.

  //         // Update the 'resume' column in the 'users' table with the file path.
  //         const resumePath = `resumes/${userData.userId}/${name}`;
  //         const { data, error } = await supabase
  //           .from('users')
  //           .update({ resume: resumePath })
  //           .eq('userId', userData.userId);

  //         if (error) {
  //           console.error('Error updating user profile with resume:', error.message);
  //         } else {
  //           console.log('Resume uploaded and user profile updated successfully.');
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error during file selection:', error);
  //   }
  // };
  return (
    <View style={{ marginTop: 100, marginLeft: 33 }}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 2, marginTop: -70 }}> Back </Text>
        {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => setModalVisible(true)} style={{ fontSize: 20, fontWeight: 'bold', marginTop: -70, marginRight: 30, marginLeft: 'auto' }}>Edit Profile</Text>
      </TouchableOpacity>

      <Image style={{ width: '50%', height: '35%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} />
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
      <TouchableOpacity style={{ marginTop: 15, marginLeft: -6 }} >
        <Text onPress={() => navigation.navigate('Favour', {
                  
                    favorites:favorites,

                })} style={STYLES.registerText}>My Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 15, marginLeft: -6 }} >
        <Text onPress={() => navigation.navigate('UserDashboard')} style={STYLES.registerText}>My Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: -76, marginTop: 98 }}>
        <Image style={{ width: 30, height: 30, marginLeft: 77, marginTop: 10 }} source={require('../assets/logout.png')} />
        <Text style={{ color: 'red', marginTop: 15 }}
          onPress={handleLogout}
        >Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: -44, marginRight: 33 }}>
        <Image style={{ width: 30, height: 30, marginLeft: 77, marginTop: 10 }} source={require('../assets/upload.png')} />
        <Text style={{ color: COLORS.light, marginTop: 15 }}
          // onPress={openFilePicker}
        >Upload</Text>
      </TouchableOpacity>


      <Modal visible={isModalVisible}
        transparent={true}>

        <View style={STYLES.modaledit}>
          <Text style={{ marginRight: 159, color: COLORS.dark }}>Name:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Name"
            value={username}
            onChangeText={(text) => setusername(text)}
          />
          <Text style={{ marginRight: 159, color: COLORS.dark }}>Email:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Email"
            value={useremail}
            onChangeText={(text) => setuserEmail(text)}
          />
          <Text style={{ marginRight: 159, color: COLORS.dark }}>Mobile:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Mobile"
            value={usermobile}
            onChangeText={(text) => setuserMobile(text)}
          />
          <Text style={{ marginRight: 159, color: COLORS.dark }}>Location:</Text>
          <TextInput
            editable={true}
            style={STYLES.userprofileedit}
            placeholder="Location"
            value={location}
            onChangeText={(text) => setlocaName(text)}
          />

          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <Text style={{ color: 'black', fontSize: 20 }} onPress={handleuserupdate} >Update profile</Text>

            <Text onPress={() => setModalVisible(false)} style={{ fontSize: 20, marginLeft: 10, color: 'red' }}>close</Text>
          </View>
        </View>

      </Modal>
    </View>
  );
};




//make this component available to the app
export default Userprofile;
