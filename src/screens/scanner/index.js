/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, Image, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import Block from '../../components/block';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { colors } from '../../utils/colors';
import Header from '../../components/header';
import API from '../../api';
import { TextInput } from 'react-native-gesture-handler';

const Scanner = (props) => {

  const [scanData, setScanData] = useState(null);
	const [pData, setPData] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

	const onSuccess = (e) => {
		getPatientDetails(e.data);
	};

	const getPatientDetails = async (uid) => {
		try {
			let uparams = {
				uid: uid,
			};
      let response = await API.requestPatient(uparams);
			setScanData(uid);
			if (response.patient_data) {
        console.log(response);
				setPData(response.patient_data);
        // props.navigation.navigate('PatientDashboard');
			}
    } catch (err) {
      console.log('ERROR CATCH', err);
    }
	};

	const renderScanner = () => {
		return (
			<QRCodeScanner
        onRead={(e) => onSuccess(e)}
				reactivateTimeout={200}
        showMarker
        markerStyle={styles.scannerMarkerStyle}
				cameraStyle={styles.scannerCameraStyle}
      />
		);
	};

  const userDataItem = (txt, iconName) => {
		return (
			<Block row style={styles.infoContainer}>
				<Icon style={styles.iconContainer} name={iconName} size={20} color={colors.$secondary} />
				<Text style={styles.infoText}>
					{txt}
				</Text>
			</Block>
		);
	};

	const renderUserData = () => {
		if (pData) {
			return (
        <>
          <Block flex style={styles.infoContainer}>
            {userDataItem(pData.name, 'user')}
            {userDataItem(pData.mobile, 'phone')}
            <Block style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => props.navigation.navigate('PatientDashboard')}>
                <Text style={styles.buttonText1}>Go To Patient Dashboard</Text>
              </TouchableOpacity>
            </Block>
          </Block>
				</>
			);
		} else {
			return (
				<ActivityIndicator color={colors.$primary}/>
			);
		}
	};

	const renderHeader = () => {
    return (
      <Header>
				<Header.Left>
					<TouchableOpacity style={styles.headerBack}
						onPress={() => props.navigation.goBack()}>
            <Icon name="angle-left" size={24} color={colors.$secondary} />
          </TouchableOpacity>
        </Header.Left>
        <Header.Body>
					<Text style={styles.headerText}>Patient Details</Text>
        </Header.Body>
				<Header.Right/>
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
			{ setPData ? renderHeader() : null}
      <Block paddingX style={styles.container}>
        {	setPData ? renderUserData() : null}
				{scanData ? null : renderScanner()}
      </Block>
    </>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
    justifyContent: 'center',
  },
	centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonContainer: {
    width: '70%',
    height: 40,
    backgroundColor: colors.$secondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText1: {
    color: colors.$white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
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
	scannerMarkerStyle: {
    borderColor: '#424fd1',
    borderRadius: 10,
    width: 200,
    height: 200,
  },
	scannerCameraStyle: {
    height: '100%',
  },
	infoContainer: {
		marginTop: 20,
		width: '100%',
		backgroundColor: 'transparent',
	},
	infoText: {
    color: colors.$secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
	iconContainer: {
		paddingHorizontal: 10,
	},
});
