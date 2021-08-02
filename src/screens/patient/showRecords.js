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
} from 'react-native';
import Block from '../../components/block';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import Header from '../../components/header';
import API from '../../api';
import dataStore from '../../store/dataStore';
import { observer } from 'mobx-react';
import { TextInput } from 'react-native-gesture-handler';

const Records = observer((props) => {

	const report = props.route.params?.report;
	const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

	const recordItem = (item) => {
		if (item) {
			return (
				<Block row style={styles.infoContainer}>
					<Text style={styles.infoText}>
						{item.name}
					</Text>
					<Text style={styles.infoValue}>
						{item.value}
					</Text>
			</Block>
			);
		}
	};


	const listRecords = () => {
		let rList = report.records;
    if (rList) {
      if (rList.length > 0) {
        return (
          <Block style={{backgroundColor: 'transparent', width: '100%', marginVertical: 5}}>
            <FlatList
              data={rList}
              renderItem={({ item, index }) => recordItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={1}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              // contentContainerStyle={styles.flatListContainer}
            />
          </Block>
        );
      } else {
        return (
          <Block style={{backgroundColor: 'transparent', paddingVertical: 20}}>
            <Text>No Records added yet!</Text>
          </Block>
        );
      }
    } else {
      return (
        <Block>
          <ActivityIndicator color={colors.$black} />
        </Block>
      );
    }
	};

	const renderRecords = (item, index) => {
		return (
			<Block style={{backgroundColor: 'transparent', width: '100%', alignItems:'center', marginTop: 20}}>
				<Text style={styles.label}>Records</Text>
				{listRecords()}
			</Block>
		);
	};

	const assetItem = (item) => {
		if (item && item.asset) {
			return (
				<TouchableOpacity
					onPress={() => props.navigation.navigate('ShowImage', {url: item.asset.url})}>
					<Image
						resizeMode={'cover'}
						style={styles.assetImage}
						source={{uri: item.asset.url}}
					/>
				</TouchableOpacity>
			);
		}
	};

	const renderAssetsList = () => {
    let astList = report.assets;
    if (astList) {
      if (astList.length > 0) {
        return (
          <Block style={{backgroundColor: 'transparent', width: '100%', marginVertical: 20}}>
            <FlatList
              data={astList}
              renderItem={({ item, index }) => assetItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={1}
							numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              // contentContainerStyle={styles.flatListContainer}
            />
          </Block>
        );
      } else {
        return (
          <Block style={{backgroundColor: 'transparent', paddingVertical: 20}}>
            <Text>No Records added yet!</Text>
          </Block>
        );
      }
    } else {
      return (
        <Block>
          <ActivityIndicator color={colors.$black} />
        </Block>
      );
    }
  };

	const renderAssets = () => {
		return (
			<Block style={{backgroundColor: 'transparent', width: '100%', alignItems:'center', marginTop: 20}}>
				<Text style={styles.label}>Reports</Text>
				{renderAssetsList()}
			</Block>
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

	const renderBasicDetails = () => {
		if (report) {
			return (
				<Block style={styles.infoContainer}>
					{report.doctor_name ? userDataItem(report.doctor_name, 'user-md') : null}
					{report.laboratory ? userDataItem(report.laboratory, 'flask') : null}
				</Block>
			);
		} else {
			return null;
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
				{renderBasicDetails()}
				{renderAssets()}
				{renderRecords()}
			</Block>
		</>
  );
});

export default Records;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
		paddingHorizontal: 15,
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
	infoValue: {
    color: colors.$secondary,
    fontSize: 14,
		paddingHorizontal: 10,
  },
	iconContainer: {
		paddingHorizontal: 10,
	},
	assetImage: {
		width: 150,
		height: 150,
		marginHorizontal: 7,
		marginVertical: 10,
	},
	label: {
		color: colors.$secondary,
    fontSize: 16,
    fontWeight: 'bold',
	},
});
