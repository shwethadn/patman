/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Block from '../../components/block';
import Header from '../../components/header';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';
import Prescription from './prescription';
import LabReport from './labReport';


const PatientDashboard = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

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

  const renderGridTiles = () => {
    return (
      <Block row style={{justifyContent: 'center', backgroundColor: 'transparent'}}>
        <TouchableOpacity style={{backgroundColor: colors.$secondary, width: '100%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
          <Block style={{backgroundColor: colors.$secondary, width: '100%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="book" size={60} color={colors.$primary} />
          </Block>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: colors.$secondary, width: '40%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
          <Block style={{backgroundColor: colors.$secondary, width: '40%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="list" size={60} color={colors.$primary} />
          </Block>
        </TouchableOpacity>
      </Block>
    );
  }

  const renderTiles = () => {
    return (
      <Block style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        <TouchableOpacity style={{backgroundColor: colors.$secondary, width: '60%', height: 100,
            marginHorizontal: 10, marginVertical: 40, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
          <Block style={{backgroundColor: colors.$secondary, width: '100%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="book" size={60} color={colors.$primary} />
          </Block>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: colors.$secondary, width: '60%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
          <Block style={{backgroundColor: colors.$secondary, width: '100%', height: 100,
            marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
            justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="list" size={60} color={colors.$primary} />
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const floatButton = () => {
    console.log(selectedTab);
    return (
      <TouchableOpacity style={styles.floatButtonContainer}
        onPress={() => props.navigation.navigate('Upload',
          {type: selectedTab === 1 ? 'Prescription' : 'Lab Report'})}
        >
        <Icon name="upload" size={28} color={colors.$white} />
      </TouchableOpacity>
    );
  };

  const TopTabs = createMaterialTopTabNavigator();

  const topTabs = () => {
    return (
      <TopTabs.Navigator
        initialRouteName={selectedTab === 1 ? 'Prescription' : 'Lab Report'}
        swipeEnabled={false}
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
          name="Prescription"
          listeners={{
            tabPress: (e) => {
              setSelectedTab(1);
            },
          }}
          component={Prescription}
        />
        <TopTabs.Screen
          name="Lab Report"
          listeners={{
            tabPress: (e) => {
              setSelectedTab(2);
            },
          }}
          component={LabReport}
        />
      </TopTabs.Navigator>
    );
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
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Icon name="user-circle" size={22} color={colors.$secondary} />
          </TouchableOpacity>
        </Header.Right>
      </Header>
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
      <Block style={styles.container}>
        {/* {renderGridTiles()} */}
        {/* {renderTiles()} */}
        {topTabs()}
        {floatButton()}
      </Block>
    </>
  );
};

export default PatientDashboard;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
    // justifyContent: 'center',
  },
  patImage: {
    height: 30,
    width: '70%',
  },
  buttonContainer: {
    width: '50%',
    height: 40,
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
  tabScreen: {
    borderColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    zIndex: 0,
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
});
