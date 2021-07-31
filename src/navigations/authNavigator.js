/* eslint-disable prettier/prettier */
import React from 'react';
import { Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from 'screens/splash';
// import Signup from 'screens/signup';
// import LoginScreen from 'screens/login';


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
			{/* <Stack.Screen name="Login" component={Login} options={slideOptions} />
			<Stack.Screen name="Signup" component={Signup} options={slideOptions} /> */}
		</Stack.Navigator>
	);
}

export default function AuthNavigator() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
