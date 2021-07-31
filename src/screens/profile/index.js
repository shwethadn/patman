/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
	Alert,
  Image,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import { Input } from 'react-native-elements';
import { observer } from 'mobx-react';
import Block from '../../components/block';
import Header from '../../components/header';
import { colors } from '../../utils/colors';
import API from '../../api';
import userStore from '../../store/userStore';

const Profile = observer((props) => {
// const Profile = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
	const [role, setRole] = useState(null);

  useEffect(() => {
		userDetails();
  }, []);

  const userDetails = async () => {
    try {
      let response = await API.me();
			if (response && response.response) {
				setRole(response.response.type);
			}
    } catch (err) {
      console.log('Profile ERROR CATCH', err);
    }
  };

	const signout = async () => {
    setLoading(true);
    try {
      let response = await API.signOut();
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
      props.navigation.dispatch(resetAction);
    } catch (err) {
      console.log('LOGIN ERROR CATCH', err);
      setLoading(false);
    }
  };

	const logoutWarning = () => {
		Alert.alert(
			'Logout',
			'Are you sure you want to logout?',
			[
				{
					text: 'Cancel',
					onPress: () => null,
				},
				{
					text: 'Yes',
					onPress: () => {
						signout();
					},
				},
			],
		);
	};

	const renderQRcode = () => {
		if (role === 'Patient' && userStore.currentUser) {
			let qrcodeURL = 'http://res.cloudinary.com/progton/image/upload/v1627659174/development/User/2/qr_code/aaefc117-fb60-4074-99f5-c423af454bf4.png.png'
			return (
				<Block style={[styles.infoContainer, {justifyContent: 'center', alignItems: 'center'}]}>
					<Text style={styles.qrCodeText}>QR Code</Text>
					<Image
						resizeMode={'cover'}
						style={styles.qrCode}
						source={{
							uri: userStore.currentUser && userStore.currentUser.qr_code ? userStore.currentUser.qr_code : qrcodeURL,
						}}/>
				</Block>
			);
		} else {
			return null;
		}
	};

	const userDataItem = (txt, iconName) => {
		return (
			<Block row style={styles.infoContainer}>
				<Icon style={styles.iconContainer} name={iconName} size={20} color={colors.$secondary} />
				<Text style={styles.infoText}>
					{userStore.currentUser.mobile}
				</Text>
			</Block>
		);
	};

	const renderUserData = () => {
		if (userStore.currentUser) {
			return (
				<Block flex style={styles.infoContainer}>
					{userDataItem(userStore.currentUser.name, 'user')}
					{userDataItem(userStore.currentUser.mobile, 'phone')}
					{renderQRcode()}
				</Block>
			);
		} else {
			return (
				<Block style={styles.infoContainer}>
					<ActivityIndicator color={colors.$secondary}/>
				</Block>
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
					<Text style={styles.headerText}>Profile</Text>
        </Header.Body>
				<Header.Right>
					<TouchableOpacity onPress={() => logoutWarning()}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				</Header.Right>
      </Header>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.$primary}
        barStyle="dark-content"
        hidden={false}
      />
			{renderHeader()}
      <Block flex paddingX style={styles.container}>
				{renderUserData()}
				{renderQRcode()}
      </Block>
    </>
  );
});

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
  },
  patImage: {
    marginTop: 50,
    height: 50,
    width: '50%',
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
  inputContainer: {
    marginTop: 100,
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: colors.$secondaryBold,
    fontSize: 14,
    fontWeight: 'bold',
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
  signUpContainer: {
    backgroundColor: colors.$primary,
    marginTop: 20,
  },
	qrCodeText: {
		paddingVertical: 10,
		color: colors.$secondary,
    fontSize: 14,
    fontWeight: 'bold',
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
	qrCode: {
		height: 200,
		width: 200,
	},
});
