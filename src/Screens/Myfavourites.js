//import liraries
import { View, Text, TouchableOpacity, Image,ScrollView, Modal, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';




// create a component
const Favourites = ({route}) => {
    const navigation = useNavigation();
    const favorites = route.params?.favorites;
    console.log("pass",favorites)

    const [favoriteJobs, setFavoriteJobs] = useState([]);

    useEffect(() => {
        async function fetchFavoriteJobs() {
            if (favorites && favorites.length > 0) {
                //  "in" operator to filter jobs based on the array of IDs
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .in('id', favorites);

                if (error) {
                    console.error('Error fetching favorite jobs:', error);
                } else {
                    setFavoriteJobs(data);
                    console.log("favoffffffffur",favoriteJobs)
                }
            }
        }

        fetchFavoriteJobs();
    }, [favorites]);

    console.log("favoriteJobs", favoriteJobs);


    return (
        <ScrollView style={{ width: '100%' }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Back </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.dark,marginTop:40 }}> My Favourites</Text> 
          <View>    
           
                 {favoriteJobs.map((job) => (
            <View  key={job.id} style={STYLES.card} >
              <Text style={STYLES.profiledetails}>{job.title}</Text>
              <Text style={STYLES.profiledetails}>{job.location}</Text>
            </View>
          ))}
          </View>
        </ScrollView>
      );
};



export default Favourites;
