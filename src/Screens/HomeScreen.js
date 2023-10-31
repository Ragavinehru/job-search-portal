import React, { useState, useEffect } from 'react';
import {
    Button, Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight, TouchableOpacity,
    View, Image, SafeAreaView
} from 'react-native';
import { supabase } from '../../supabase';
import STYLES from '../styles';
import COLORS from '../colors/color';

import { Alert } from 'react-native';



const HomeScreen = () => {
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>

            <View style={{ marginLeft: 10, marginTop: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22 }}>Hello!!</Text>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: COLORS.dark,
                        }}>

                    </Text>
                </View>
                <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.light }}>
                    What Jobs you looking for?
                </Text>
                <Image style={STYLES.person} source={require('../assets/person.png')}></Image>
            </View>

            <View>

                <Image style={STYLES.searchimg} source={require('../assets/search.png')} />
                <TextInput placeholder="Search" style={{ borderBottomColor: 'black' }} />


            </View>


        </SafeAreaView>
    )
}

export default HomeScreen;