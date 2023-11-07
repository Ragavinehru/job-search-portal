//import liraries
import { View, Text, TouchableOpacity, Image, Modal, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';

// create a component
const Userprofile = ({route}) => {
    const navigation = useNavigation();
    const userData = route.params?.userData;
    const [isModalVisible, setModalVisible] = useState(false);
    const [userdetails,setuserdetails]=useState(userData);
    const [username, setusername] = useState('');
    const [usermobile, setuserMobile] = useState('');
    const [location, setlocaName] = useState('');
    const [useremail, setuserEmail] = useState('');


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
        setusername(userData.username);
        setuserMobile(userData.usermobile);
        setlocaName(userData.location);
        setuserEmail(userData.useremail);
      }, [userData]);

      
    return (
        <View style={{ marginTop: 100, marginLeft: 33 }}>
<TouchableOpacity onPress={navigation.goBack}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 2,marginTop:-70  }}> Back </Text>
        {/* <Image style={{ width: '50%', height: '60%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => setModalVisible(true)} style={{ fontSize: 20, fontWeight: 'bold', marginTop: -60, marginRight: 30, marginLeft: 'auto' }}>Edit Profile</Text>
      </TouchableOpacity>
       
       <Image style={{ width: '50%', height: '40%', marginLeft: 77, marginTop: 10 }} source={require('../assets/user.png')} />
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

       <Modal visible={isModalVisible}
        transparent={true}>

    <View style={STYLES.modaledit}>
          <Text style={{ marginRight: 159 }}>Name:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Name"
            value={username}
            onChangeText={(text) => setusername(text)}
          />
          <Text style={{ marginRight: 159 }}>Email:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Email"
            value={useremail}
            onChangeText={(text) => setuserEmail(text)}
          />
          <Text style={{ marginRight: 159 }}>Mobile:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
            placeholder="Mobile"
            value={usermobile}
            onChangeText={(text) => setuserMobile(text)}
          />
          <Text style={{ marginRight: 112 }}>Location:</Text>
          <TextInput
            editable={true}
            style={STYLES.useredit}
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
