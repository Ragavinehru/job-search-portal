
import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';


const EmployerProfile = () => {
  const navigation = useNavigation();
  // const [userDetails, setUserDetails] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [employeename, setEmployeename] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');

  console.log("12hgfdtgyuuy5", empdetails)
  const route = useRoute();
  // const empdetails = employerData;
  const employerData = route.params?.employerData;
  const employerid = employerData.userId;
  const [empdetails, setEmployerData] = useState(employerData);
  console.log("123455", empdetails)

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.navigate('login');

    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleUpdateProfile = async () => {


    try {
      const { data, error } = await supabase
        .from('employers')
        .update({
          name: employeename,
          mobile: mobile,
          company_name: companyName,
          email: email,
        })
        .eq('userId', employerData.userId);
      console.log('Updated Data:', data, error);

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        console.log('Profile updated successfully');
        setEmployerData({
          ...employerData,
          name: employeename,
          mobile: mobile,
          company_name: companyName,
          email: email,
        });

        setModalVisible(false);

      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    setEmployeename(employerData.name);
    setMobile(employerData.mobile);
    setCompanyName(employerData.company_name);
    setEmail(employerData.email);
  }, [employerData]);

  return (
    <View style={{ marginTop: 100, marginLeft: 33 }}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -12, marginTop: -60 }}> Back </Text>
        {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => setModalVisible(true)} style={{ fontSize: 20, fontWeight: 'bold', marginTop: -60, marginRight: 30, marginLeft: 'auto' }}>Edit Profile</Text>
      </TouchableOpacity>
      <Image style={{ width: '50%', height: '35%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} />
      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 7 }}>
        <Text style={STYLES.profiledetails}>Name: {empdetails.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
        <Text style={STYLES.profiledetails}>Email: {empdetails.email}</Text>
      </View>
      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
        <Text style={STYLES.profiledetails}>Mobile: {empdetails.mobile}</Text>
      </View>

      <View style={{ flexDirection: 'row', fontSize: 27, marginTop: 12 }}>
        <Text style={STYLES.profiledetails} >CompanyName: {empdetails.company_name}</Text>
      </View>

      <TouchableOpacity style={{ marginTop: 10, }} onPress={() => navigation.navigate('postedjob', { employerData: employerData })}>
        <Text style={STYLES.registerText}>Posted Jobs</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: -76, marginTop: 98 }}>
        <Image style={{ width: 30, height: 30, marginLeft: 77, marginTop: 10 }} source={require('../assets/logout.png')} />
        <Text style={{ color: 'red', marginTop: 15 }}
          onPress={handleLogout}
        >Logout</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible}
        transparent={true}>
        <View style={STYLES.modaledit}>
          <Text style={{ marginRight: 159 }}>Name:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Name"
            value={employeename}
            onChangeText={(text) => setEmployeename(text)}
          />
          <Text style={{ marginRight: 159 }}>Email:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ marginRight: 159 }}>Mobile:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Mobile"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
          <Text style={{ marginRight: 112 }}>CompanyName:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Company Name"
            value={companyName}
            onChangeText={(text) => setCompanyName(text)}
          />
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <Text style={{ color: 'black', fontSize: 20 }} onPress={handleUpdateProfile} >Update profile</Text>

            <Text onPress={() => setModalVisible(false)} style={{ fontSize: 20, marginLeft: 10, color: 'red' }}>close</Text>
          </View>

          {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image style={{   width: '6%', height: '12%',backgroundColor:'red' }} source={require('../assets/close.png')} />
            </TouchableOpacity> */}
        </View>

      </Modal>
    </View>
  );
}

export default EmployerProfile;
