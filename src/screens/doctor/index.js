/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Block from '../../components/block';
import Header from '../../components/header';
import { Input, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../../utils/colors';
import API from '../../api';
import Approvals from './approvals';
import PatientDetails from './patientDetails';

const DoctorDashboard = (props) => {

  const [mobile, setMobile] = useState('');
  const [selectedTab, setSelectedTab] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  const signout = async () => {
    setLoading(true);
    try {
      let response = await API.signOut();
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
      props.navigation.dispatch(resetAction);
      console.log("signout",response);
    } catch (err) {
      console.log('LOGIN ERROR CATCH', err);
      setLoading(false);
    }
  };

  const renderHeader = () => {
    return (
      <Header>
        <Header.Left/>
        <Header.Body>
          <Image
            resizeMode={'contain'}
            style={styles.patImage}
            source={require('../../utils/images/Logo.png')} />
        </Header.Body>
        <Header.Right>
          <Block row>
            <TouchableOpacity style={styles.navBarIconContainer} onPress={() => props.navigation.navigate('DoctorApprovals')}>
              <Icon name="list" size={20} color={colors.$secondary} />
              <Badge status="error" value={3} containerStyle={styles.badgeStyle}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBarIconContainer} onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="user-circle" size={21} color={colors.$secondary} />
            </TouchableOpacity>
          </Block>
        </Header.Right>
      </Header>
    );
  };

  const TopTabs = createMaterialTopTabNavigator();

  const topTabs = () => {
    return (
      <TopTabs.Navigator
        initialRouteName={selectedTab === 1 ? 'Patient' : 'Approvals'}
        swipeEnabled={true}
        showIcon={true}
        tabBarOptions={{
          activeTintColor: colors.$secondaryBold,
          labelStyle: styles.labelText,
          indicatorStyle: {
            backgroundColor: colors.$secondaryBold,
          },
          sceneContainerStyle: styles.tabScreen,
          style: styles.topTabStyle,
        }}>
        <TopTabs.Screen
          name="Patient"
          component={PatientDetails}
        />
        <TopTabs.Screen
          name="Approvals"
          component={Approvals}
        />
      </TopTabs.Navigator>
    );
  };

  const renderPatientDetails = () => {
    return (
      <PatientDetails />
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={'#f0f0f0'}
        barStyle="dark-content"
        hidden={false}
      />
      {renderHeader()}
      {/* {topTabs()} */}
      {renderPatientDetails()}
      <Block paddingX style={styles.container}>
        {/* <TouchableOpacity style={styles.buttonContainer}
          onPress={() => props.navigation.navigate('Scanner')}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.floatButtonContainer}
          onPress={() => props.navigation.navigate('Scanner')}>
          <Icon name="qrcode" size={28} color={colors.$white} />
        </TouchableOpacity>
      </Block>
    </>
  );
};

export default DoctorDashboard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
    justifyContent: 'center',
  },
  patImage: {
    height: 30,
    width: '70%',
  },
  navBarIconContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.$primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: 60,
    right: 30,
    position: 'absolute',
    backgroundColor: colors.$secondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: colors.$white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  topTabStyle: {
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 0.5,
    borderWidth: 0,
    elevation: 0,
    height: 45,
    marginTop: -5,
    width: Dimensions.get('window').width,
    zIndex: 0,
    backgroundColor: colors.$primary,
  },
	labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  badgeStyle: {
    top: -9,
    right: 2,
    position: 'absolute',
  },
  // eslint-disable-next-line react-native/no-color-literals
  tabScreen: {
    borderColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    zIndex: 0,
  },
});
