/* eslint-disable prettier/prettier */
import React from 'react';
import { Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './screens/splash';
import Login from './screens/login';
import SignUp from './screens/signUp';
import Scanner from './screens/scanner';
import Landing from './screens/landing';
import Profile from './screens/profile';
import DoctorDashboard from './screens/doctor';
import DoctorApprovals from './screens/doctor/approvals';
import PatientDashboard from './screens/patient';
import Upload from './screens/patient/upload';

const Stack = createStackNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
	const progress = Animated.add(
		current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		}),
		next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: 'clamp',
				})
			: 0,
	);
	return {
		cardStyle: {
			transform: [
				{
					translateX: Animated.multiply(
						progress.interpolate({
							inputRange: [0, 1, 2],
							outputRange: [
								screen.width, // Focused, but offscreen in the beginning
								0, // Fully focused
								screen.width * -0.3, // Fully unfocused
							],
							extrapolate: 'clamp',
						}),
						inverted,
					),
				},
			],
		},
	};
};

const slideOptions = {
	headermode: 'screen',
	cardStyleInterpolator: forSlide,
};

function MyStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen
				name="SplashScreen"
				component={SplashScreen}
				options={slideOptions}
			/>
			<Stack.Screen name="Login" component={Login} options={slideOptions} />
			<Stack.Screen name="SignUp" component={SignUp} options={slideOptions} />
      <Stack.Screen name="Profile" component={Profile} options={slideOptions} />
      <Stack.Screen name="Scanner" component={Scanner} options={slideOptions} />
      <Stack.Screen name="Landing" component={Landing} options={slideOptions} />
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} options={slideOptions} />
      <Stack.Screen name="DoctorApprovals" component={DoctorApprovals} options={slideOptions} />
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} options={slideOptions} />
      <Stack.Screen name="Upload" component={Upload} options={slideOptions} />
    </Stack.Navigator>
	);
}

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
