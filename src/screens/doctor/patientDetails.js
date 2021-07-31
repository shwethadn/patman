/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, StatusBar, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Block from '../../components/block';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';
import { TextInput } from 'react-native-gesture-handler';

const PatientDetails = (props) => {

  const [refreshing, setRefreshing] = useState(false);
	const [searchText, setSearchText] = useState('');

  useEffect(() => {
  }, []);

	const getPatientDetails = () => {

	};

	const patientItem = async (item, index) => {
		return (
			<Block>
				<Text>Patient 1</Text>
			</Block>
		);
	};

  const renderPatientDetails= () => {
    let ptList = doctorStore.patientDetails;
    if (ptList) {
      if (ptList.length > 0) {
        return (
          <Block>
            <FlatList
              data={ptList}
              renderItem={({ item, index }) => patientItem(item, index)}
              keyExtractor={(item) => item.uid}
              onEndReachedThreshold={1}
              refreshing={refreshing}
              onRefresh={() => getPatientDetails()}
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

	const renderSerachBar = () => {
		return (
			<Block style={styles.searchBarContainer}>
				<Block row style={styles.searchBar}>
					<Icon style={styles.searchBarIcon} name="search" size={20} color={colors.$secondary} />
					<TextInput
						value={searchText}
						placeholder='Search Patient'
						onChangeText={(txt) => setSearchText(txt)}
					/>
				</Block>
			</Block>
		)
	}

  return (
    <>
      <StatusBar
        backgroundColor={'#f0f0f0'}
        barStyle="dark-content"
        hidden={false}
      />
      {renderSerachBar()}
			
      <Block paddingX style={styles.container}>
				<Text style={styles.buttonText}>Patient Details</Text>
      </Block>
    </>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.$primary,
    flex: 1,
    justifyContent: 'center',
  },
  patImage: {
    height: 30,
    width: '70%',
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
    color: colors.$secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
	flatListContainer: {
    paddingHorizontal: 27,
  },
	searchBarContainer: {
		width: '100%',
		backgroundColor: colors.$secondary,
		height: 50,
		justifyContent: 'center',
		// alignItems: 'center',
	},
	searchBar: {
		marginHorizontal: 10,
		paddingHorizontal: 5,
		backgroundColor: colors.$primary,
		borderRadius: 15,
		height: 40,
		alignItems: 'center',
	},
	searchBarIcon: {
		paddingHorizontal: 5,
		backgroundColor: 'transparent',
	},
});
