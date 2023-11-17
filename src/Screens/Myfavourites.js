//import liraries
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';




// create a component
const Favourites = ({ route }) => {
  const navigation = useNavigation();
  const favorites = route.params?.favorites;
  console.log("pass", favorites)
  const userId = global.userId;
  console.log('Global User ID:', userId);
  const [favoriteJobIds, setFavoriteJobIds] = useState([]);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  useEffect(() => {
    async function fetchFavoriteJobs() {
      try {
        if (favorites.length > 0) {
          // Fetch the corresponding job details from the jobs table
          const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .in('id', favorites);

          if (error) {
            console.error('Error fetching favorite jobs:', error.message);
          } else {
            // Set the favorite jobs in state
            setFavoriteJobs(data);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite jobs:', error.message);
      }
    }

    fetchFavoriteJobs();
  }, [favoriteJobIds]);


  return (
    <ScrollView style={{ width: '100%' }}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Back </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.dark, marginTop: 40 }}> My Favourites</Text>
      <FlatList
        data={favoriteJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => navigation.navigate('jobdetails', { jobData: item })}
        >
          <View key={item.id} style={STYLES.cardfav}>
            <Text style={STYLES.profiledetails}>{item.title}</Text>
            <Text style={STYLES.profiledetails}>{item.location}</Text>
            {/* Add more job details as needed */}
          </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};



export default Favourites;
