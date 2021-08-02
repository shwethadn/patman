/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Text
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Block from '../../components/block';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';
import Prescription from './prescription';
import LabReport from './labReport';
import { observer } from 'mobx-react';
import userStore from '../../store/userStore';
import dataStore from '../../store/dataStore';

const PatientDashboard = observer((props) => {
  const [selectedTab, setSelectedTab] = useState(2);
  const [role, setRole] = useState(null);

  useEffect(() => {
    dataStore.setLabReports(null);
    dataStore.setLabReports(null);
    setRoleVal();
  }, []);

  const setRoleVal = async () => {
    const role = await AsyncStorage.getItem('@role');
    console.log("ROLE", role);
    setRole(role);
  };

  // const renderGridTiles = () => {
  //   return (
  //     <Block row style={{justifyContent: 'center', backgroundColor: 'transparent'}}>
  //       <TouchableOpacity style={{backgroundColor: colors.$secondary, width: '100%', height: 100,
  //           marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
  //           justifyContent: 'center', alignItems: 'center'}}>
  //         <Block style={{backgroundColor: colors.$secondary, width: '100%', height: 100,
  //           marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
  //           justifyContent: 'center', alignItems: 'center'}}>
  //             <Icon name="book" size={60} color={colors.$primary} />
  //         </Block>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{backgroundColor: colors.$secondary, width: '40%', height: 100,
  //           marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
  //           justifyContent: 'center', alignItems: 'center'}}>
  //         <Block style={{backgroundColor: colors.$secondary, width: '40%', height: 100,
  //           marginHorizontal: 10, marginVertical: 20, borderRadius: 15,
  //           justifyContent: 'center', alignItems: 'center'}}>
  //             <Icon name="list" size={60} color={colors.$primary} />
  //         </Block>
  //       </TouchableOpacity>
  //     </Block>
  //   );
  // };

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
          name="Lab Report"
          listeners={{
            tabPress: (e) => {
              setSelectedTab(2);
            },
          }}
          component={LabReport}
        />
        <TopTabs.Screen
          name="Prescription"
          listeners={{
            tabPress: (e) => {
              setSelectedTab(1);
            },
          }}
          component={Prescription}
        />
      </TopTabs.Navigator>
    );
  };

  const renderHeader = () => {
    return (
      <Header>
        { role && role === 'Patient' ? (<Header.Left/>) :
          (<Header.Left>
            <TouchableOpacity style={styles.headerBack}
              onPress={() => props.navigation.goBack()}>
              <Icon name="angle-left" size={24} color={colors.$secondary} />
            </TouchableOpacity>
          </Header.Left>)
        }
        <Header.Body>
          { role && role === 'Patient' ? (
            <Image
              resizeMode={'contain'}
              style={styles.patImage}
              source={require('../../utils/images/Logo.png')} />
            ) : <Text style={styles.headerText}>Reports</Text>
          }
        </Header.Body>
        { role && role === 'Patient' ? (
          <Header.Right>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="user-circle" size={22} color={colors.$secondary} />
            </TouchableOpacity>
          </Header.Right>) : (<Header.Right/>)
        }
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
        {topTabs()}
        {role && role === 'Patient' ? floatButton() : null}
      </Block>
    </>
  );
});

export default PatientDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.$primary,
    flex: 1,
  },
  patImage: {
    height: 30,
    width: '70%',
  },
  headerBack: {
		height: 30,
		width: 30,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		color: colors.$secondaryBold,
		fontSize: 14,
		fontWeight: 'bold',
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
