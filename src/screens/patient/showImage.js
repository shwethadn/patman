/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Alert,
	Image,
	Dimensions,
} from 'react-native';
import Block from '../../components/block';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageZoom from 'react-native-image-pan-zoom';
import { colors } from '../../utils/colors';
import Header from '../../components/header';
import API from '../../api';
import dataStore from '../../store/dataStore';
import { observer } from 'mobx-react';
import { TextInput } from 'react-native-gesture-handler';

const ShowImage = observer((props) => {

	const url = props.route.params?.url;

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
				<Text style={styles.headerText}>Records	</Text>
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
			{renderHeader()}
			<Block style={styles.container}>
				<ImageZoom
					cropWidth={Dimensions.get('window').width}
					cropHeight={Dimensions.get('window').height}
					imageWidth={350}
					imageHeight={450}>
					<Image
						resizeMode={'cover'}
						style={styles.assetImage}
						source={{uri: url}}
					/>
				</ImageZoom>
			</Block>
		</>
  );
});

export default ShowImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
		// paddingHorizontal: 15,
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
  navBarIconContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.$primary,
    alignItems: 'center',
    justifyContent: 'center',
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
	assetImage: {
		width: 350,
		height: 500,
		// marginHorizontal: 7,
	},
});
