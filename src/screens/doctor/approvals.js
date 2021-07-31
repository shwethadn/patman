/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Alert
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Block from '../../components/block';
import Header from '../../components/header';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';
import { TextInput } from 'react-native-gesture-handler';

const Approvals = (props) => {

	const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

	const getApprovalDetails = () => {

	};

	const onAccept = async () => {
		
	}

	const onReject = async () => {
		
	}

	const acceptWarning = () => {
		Alert.alert(
			'Approve',
			'Are you sure you want to approve the request?',
			[
				{
					text: 'Cancel',
					onPress: () => null,
				},
				{
					text: 'Yes',
					onPress: () => {
						onAccept(null);
					},
				},
			],
		);
	}

	const rejectWarning = () => {
		Alert.alert(
			'Reject',
			'Are you sure you want to reject the request?',
			[
				{
					text: 'Cancel',
					onPress: () => null,
				},
				{
					text: 'Yes',
					onPress: () => {
						onReject();
					},
				},
			],
		);
	}

	const approveItem = (item, index) => {
		return (
			<Block style={{width: '90%'}}>
				<Text>Approval 1</Text>
			</Block>
		);
	};

	const approveItemDemo = () => {
		return (
			<Block row style={styles.itemContainer}>
				<Block style={styles.infoContainer}>
					<Text>Patient ID: ssdjhbcsj</Text>
					<Text>Patient name: ssdjhbcsj</Text>
					<Text>report name: ssdjhbcsj</Text>
				</Block>
				<Block style={styles.actionIconBlock}>
					<TouchableOpacity onPress={() => acceptWarning()}
						style={styles.actionIconContainer}>
						<Icon name="check" size={35} color={colors.$accept} />
					</TouchableOpacity>
				</Block>
				<Block style={styles.actionIconBlock}>
					<TouchableOpacity onPress={() => rejectWarning()}
						style={styles.actionIconContainer}>
						<Icon name="times" size={35} color={colors.$reject} />
					</TouchableOpacity>
				</Block>
			</Block>
		);
	};

	const renderApprovalDetails= () => {
    let apList = doctorStore.approvals;
    if (apList) {
      if (apList.length > 0) {
        return (
          <Block>
            <FlatList
              data={apList}
              renderItem={({ item, index }) => approveItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={1}
              refreshing={refreshing}
              onRefresh={() => getApprovalDetails()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
            />
          </Block>
        );
      } else {
        return (
          <Block>
            <Text>No Data</Text>
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
					<Text style={styles.headerText}>Approvals</Text>
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
      <Block style={styles.container}>
				{approveItemDemo()}
				{approveItemDemo()}
				{approveItemDemo()}
      </Block>
    </>
  );
};

export default Approvals;

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
	flatListContainer: {
    paddingHorizontal: 27,
  },
	itemContainer: {
		width: '100%',
		height: 70,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoContainer: {
		borderRadius: 10,
		width: '70%',
		height: '100%',
		paddingHorizontal: 10,
		justifyContent: 'center',
	},
	actionIconBlock: {
		width: '15%',
		borderRadius: 10,
	},
	actionIconContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
