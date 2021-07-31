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
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { Input } from 'react-native-elements';
import Block from '../../components/block';
import { colors } from '../../utils/colors';
import API from '../../api';

const Login = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      let loginParams = {
        mobile: mobile,
        password: password,
      };
      let response = await API.login(loginParams);
      if (response.access_token) {
          const role = await AsyncStorage.getItem('@role');
          // const role = 'Doctor';
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: role === 'Doctor' ? 'DoctorDashboard' : 'PatientDashboard'}],
          });
          props.navigation.dispatch(resetAction);
      } else {
        let errMsg = response.message ? response.message : "Something went wrong, Please try again!"
        Toast.show(errMsg, Toast.LONG);
        setLoading(false);
      }
    } catch (err) {
      console.log('LOGIN ERROR CATCH', err);
      setLoading(false);
    }
  };

  const gotoSignUp = () => {
    props.navigation.navigate('SignUp');
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.$primary}
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
            placeholder="Mobile"
            onChangeText={value => setMobile(value)}
            keyboardType="numeric"
          />
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
          (<TouchableOpacity style={styles.buttonContainer} onPress={() => login()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>)
        }
        <Block row style={styles.signUpContainer}>
          <Text style={styles.newUserText}>New user? </Text>
          <TouchableOpacity onPress={() => gotoSignUp()}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </>
  );
};

export default Login;

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
