/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Block from '../../components/block';
import Header from '../../components/header';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';


const Landing = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
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
      <Block paddingX style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => props.navigation.navigate('Scanner')}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => signout()}>
          <Text style={styles.buttonText}>Singout</Text>
        </TouchableOpacity>
      </Block>
    </>
  );
};

export default Landing;

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
});
