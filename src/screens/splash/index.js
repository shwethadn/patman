/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import API from '../../api';
import APIService from '../../api/service';
import NetInfo from '@react-native-community/netinfo';
import { colors } from '../../utils/colors';

const SplashScreen = (props) => {

  const checkNetwork = async () => {
    const status = await NetInfo.fetch();
    if (!status.isConnected) {return false;}
    return true;
  };

  const getData = async () => {
    try {
      if (!(await checkNetwork())) {throw new Error('Network Error');}
      const auth_key = await AsyncStorage.getItem('@auth_key');
      const role = await AsyncStorage.getItem('@role');
      // console.log("sdbi",rolea);
      // const role = 'Doctor';
      if (auth_key) {
        APIService.setAuthHeader(auth_key);
        API.setAuthHeader(auth_key);
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: role === 'Doctor' ? 'DoctorDashboard' : 'PatientDashboard'}],
        });
        props.navigation.dispatch(resetAction);
      } else {
        props.navigation.navigate('Login');
      }
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  useEffect(() => {
    checkNetwork();
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'#f0f0f0'}
        barStyle="dark-content"
        hidden={false}
      />
      <TouchableOpacity style={styles.container} onPress={() => getData()}>
        <Image
          resizeMode={'contain'}
          style={styles.splashImage}
          source={require('../../utils/images/splashLogo.png')} />
      </TouchableOpacity>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
    justifyContent: 'center',
  },
  splashImage: {
    height: 300,
    width: '80%',
  },
});
