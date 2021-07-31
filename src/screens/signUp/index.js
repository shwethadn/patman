/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import Block from '../../components/block';
import { colors } from '../../utils/colors';
import API from '../../api';

const SignUp = (props) => {

  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showRoles, setShowRoles] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // checkNetwork();
    // getRoles();
  }, []);

  const signup = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      let signUpParams = {
        mobile: mobile,
        name: name,
        role: role,
        password: password,
      };
      let response = await API.signup(signUpParams);
      if (response.access_token) {
          // const role = await AsyncStorage.getItem('@role');
          const role = 'Doctor';
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: role === 'Doctor' ? 'DoctorDashboard' : 'Landing'}],
          });
          props.navigation.dispatch(resetAction);
      } else {
        let errMsg = response.message ? response.message : "Something went wrong, Please try again!"
        Toast.show(errMsg, Toast.LONG);
        setLoading(false);
      }
    } catch (err) {
      console.log('Sign up ERROR CATCH', err);
      setLoading(false);
    }
  };

  const selectRole = (role) => {
    setRole(role);
    setShowRoles(false);
  };

  const rolesOverlay = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={showRoles}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setShowRoles(false)}>
        <Block style={{height: '25%', paddingHorizontal: 40, borderRadius: 20}}>
          <Text style={{paddingVertical: 15, textAlign: 'center', fontSize: 16}}>
            Select Roles
          </Text>
          <TouchableOpacity style={{paddingVertical: 15}}
            onPress={() => selectRole('Doctor')}>
            <Text style={{fontSize: 16, fontWeight: role === 'Doctor' ? 'bold' : 'normal'}}>
              Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 15}}
            onPress={() => selectRole('Patient')}>
            <Text style={{fontSize: 16, fontWeight: role === 'Patient' ? 'bold' : 'normal'}}>
              Patient
            </Text>
          </TouchableOpacity>
        </Block>
      </Modal>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={'#f0f0f0'}
        barStyle="dark-content"
        hidden={false}
      />
      <Block paddingX style={styles.container}>
        <Image
          resizeMode={'contain'}
          style={styles.patImage}
          source={require('../../utils/images/Logo.png')} />
        <Block style={styles.inputContainer}>
          <Input
            value={mobile}
            placeholder='Mobile'
            onChangeText={value => setMobile(value)}
            keyboardType="numeric"
          />
          <Input
            value={name}
            placeholder="Name"
            // errorStyle={{ color: 'red' }}
            // errorMessage='ENTER A VALID ERROR HERE'
            onChangeText={value => setName(value)}
          />
          <TouchableOpacity style={{width: '100%'}} onPress={() => setShowRoles(true)}>
            <Input
              value={role}
              editable={false}
              placeholder="Role"
              onChangeText={value => setRole(value)}
            />
          </TouchableOpacity>
          <Input
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
          />
        </Block>
        { loading ?
          (<Block style={styles.buttonContainer}>
            <ActivityIndicator color={colors.$white}/>
          </Block>) :
          (<TouchableOpacity style={styles.buttonContainer}
            onPress={() => signup()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>)
        }
        <Block row style={styles.signUpContainer}>
          <Text style={styles.newUserText}>Existing user? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </Block>
        {rolesOverlay()}
      </Block>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
  },
  patImage: {
    marginTop: 50,
    height: 50,
    width: '50%',
  },
  inputContainer: {
    marginTop: 100,
    width: '100%',
    backgroundColor: 'transparent',
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
  signUpContainer: {
    backgroundColor: colors.$primary,
    marginTop: 20,
  },
  newUserText: {
    color: colors.$secondary,
    fontSize: 14,
  },
  signupText: {
    color: colors.$secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
