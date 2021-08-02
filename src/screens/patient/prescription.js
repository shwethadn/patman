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
} from 'react-native';
import Block from '../../components/block';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';
import moment from 'moment';
import dataStore from '../../store/dataStore';
import { observer } from 'mobx-react';

const Prescription = observer((props) => {

	const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState(null);

  useEffect(() => {
    // dataStore.setLabReports(null);
		getPrescriptions();
  }, []);

	const getPrescriptions = async () => {
		try {
			let params = {
				patient_id: 2,
			};
      let response = await API.getPrescriptions(params);
      if (response && response.response) {
        setPrescriptions(response.response);
      } else {
        setPrescriptions([]);
      }
    } catch (err) {
      console.log('Profile ERROR CATCH', err);
    }
	};

	const prescriptionItem = (item, index) => {
		return (
			<Block row style={[styles.itemContainer, {borderColor: item.approved ? colors.$green : '#fff', borderWidth: 1}]}>
				<TouchableOpacity style={styles.infoContainer}>
          { item.doctor_id ? (<Text>Doctor Name: {item.doctor_name}</Text>) : null}
          { item.laboratory ? (<Text>Lab Name: {item.laboratory}</Text>) : null}
          { item.test ? (<Text>Test: {item.test}</Text>) : null}
          { item.created_at ? (<Text>Date: {moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text>) : null}
        </TouchableOpacity>
			</Block>
		);
	};

	const renderApprovalDetails = () => {
    let apList = dataStore.prescriptions;
    if (apList) {
      if (apList.length > 0) {
        return (
          <Block style={{marginTop: 15, width: '100%', backgroundColor: 'transparent'}}>
            <FlatList
              data={apList}
              renderItem={({ item, index }) => prescriptionItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={1}
              refreshing={refreshing}
              onRefresh={() => getPrescriptions()}
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
        <Block style={{marginTop: 20, width: '100%', backgroundColor: 'transparent'}}>
          <ActivityIndicator color={colors.$black} />
        </Block>
      );
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.$primary}
        barStyle="dark-content"
        hidden={false}
      />
      <Block style={styles.container}>
        <Block style={{marginTop: 15, width: '100%', backgroundColor: 'transparent'}}>
          {renderApprovalDetails()}
        </Block>
      </Block>
    </>
  );
});

export default Prescription;

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
    paddingBottom: 20,
  },
	itemContainer: {
		width: '100%',
		height: 70,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
    backgroundColor: colors.$white,
		// justifyContent: 'center',
	},
	infoContainer: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
		paddingHorizontal: 10,
		justifyContent: 'center',
    backgroundColor: colors.$white,
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
