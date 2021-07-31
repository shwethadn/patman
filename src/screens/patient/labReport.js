/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import Block from '../../components/block';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';

const LabReport = (props) => {

	const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
		getLabReports();
  }, []);

	const getLabReports = async () => {
		try {
			let params = {
				patient_id: 2,
			};
      let response = await API.getLabReports(params);
			console.log(response);
    } catch (err) {
      console.log('Profile ERROR CATCH', err);
    }
	};

	const reportItem = (item, index) => {
		return (
			<Block style={{width: '90%'}}>
				<Text>Approval</Text>
			</Block>
		);
	};

	const approveItemDemo = () => {
		return (
			<Block row style={styles.itemContainer}>
				<TouchableOpacity style={styles.infoContainer}>
					<Text>Lab name: ssdjhbcsj</Text>
					<Text>Hospital name: ssdjhbcsj</Text>
					<Text>Test Date: ssdjhbcsj</Text>
				</TouchableOpacity>
			</Block>
		);
	};

	const renderReportDetails= () => {
    let lrList = dataStore.labReports;
    if (lrList) {
      if (lrList.length > 0) {
        return (
          <Block>
            <FlatList
              data={lrList}
              renderItem={({ item, index }) => reportItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={1}
              refreshing={refreshing}
              onRefresh={() => getLabReports()}
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

  return (
    <>
      <StatusBar
        backgroundColor={colors.$primary}
        barStyle="dark-content"
        hidden={false}
      />
      <Block style={styles.container}>
				{approveItemDemo()}
				{approveItemDemo()}
				{approveItemDemo()}
      </Block>
    </>
  );
};

export default LabReport;

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
		// justifyContent: 'center',
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
