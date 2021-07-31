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

  useEffect(() => {
		userDetails();
  }, []);

  const userDetails = async () => {
    try {
      let response = await API.me();
			console.log(response);
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
      console.log("signout",response);
    } catch (err) {
      console.log('LOGIN ERROR CATCH', err);
      setLoading(false);
    }
  };

	const renderUserData = () => {
		console.log(userStore.currentUser, "userStore.currentUser")
		if (userStore.currentUser) {
			return (
				<Block flex style={styles.infoContainer}>
					<Block row style={styles.infoContainer}>
						<Icon style={styles.iconContainer} name="user" size={20} color={colors.$secondary} />
						<Text style={styles.infoText}>
							{userStore.currentUser.name}
						</Text>
					</Block>
					<Block row style={styles.infoContainer}>
						<Icon style={styles.iconContainer} name="phone" size={20} color={colors.$secondary} />
						<Text style={styles.infoText}>
							{userStore.currentUser.mobile}
						</Text>
					</Block>
				</Block>
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
					<Text style={styles.headerText}>Profile</Text>
        </Header.Body>
				<Header.Right/>
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
				<TouchableOpacity onPress={() => signout()}>
          <Text style={styles.buttonText}>Signout</Text>
        </TouchableOpacity>
      </Block>
    </>
  );
});

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    // flex: 1,
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
    fontSize: 16,
    fontWeight: 'bold',
		paddingBottom: 50,
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
