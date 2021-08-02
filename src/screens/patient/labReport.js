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
import { Badge } from 'react-native-elements';
import moment from 'moment';
import { colors } from '../../utils/colors';
import API from '../../api';
import { observer } from 'mobx-react';
import dataStore from '../../store/dataStore';
import { color } from 'react-native-elements/dist/helpers';

const LabReport = observer((props) => {

	const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labReports, setLabReports] = useState(null);

  useEffect(() => {
    // dataStore.setPrescriptions(null);
		getLabReports();
  }, []);

	const getLabReports = async () => {
		try {
			let params = {
				patient_id: 2,
			};
      let response = await API.getLabReports(params);
      if (response && response.response) {
        setLabReports(response.response);
      }
    } catch (err) {
      console.log('Profile ERROR CATCH', err);
    }
	};

	const reportItem = (item, index) => {
    if (item.laboratory || item.doctor_name) {
      return (
        <Block row style={[styles.itemContainer, {borderColor: item.approved ? colors.$green : '#fff', borderWidth: 2}]}>
          <TouchableOpacity style={styles.infoContainer}
            onPress={() => props.navigation.navigate('Records', {report: item})}>
            { item.doctor_name ? (<Text style={styles.nameText}>{item.doctor_name}</Text>) : null}
            { item.laboratory ? (<Text style={styles.labText}>{item.laboratory}</Text>) : null}
            { item.test ? (<Text style={styles.nameText}>{item.test}</Text>) : null}
            { item.created_at ? (<Text>{moment(item.created_at).format('MMM Do YYYY, h:mm a')}</Text>) : null}
          </TouchableOpacity>
          <Block style={{widht: '20%', backgroundColor: 'transparent'}}>
            <Badge
              badgeStyle={{backgroundColor: colors.$secondary}}
              value={item.assets.length}
              containerStyle={styles.badgeStyle}
              textStyle={{color: colors.$white}}
            />
          </Block>
        </Block>
      );
    }
	};

	const renderReportDetails = () => {
    let lrList = dataStore.labReports;
    if (lrList) {
      if (lrList.length > 0) {
        return (
          <Block style={{marginTop: 15, width: '100%', backgroundColor: 'transparent'}}>
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
        {renderReportDetails()}
      </Block>
    </>
  );
});

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
    paddingBottom: 50,
  },
	itemContainer: {
		width: '100%',
		height: 120,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
	},
	infoContainer: {
		borderRadius: 10,
		width: '100%',
		height: '90%',
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
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  labText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  badgeStyle: {
    top: -50,
    right: 5,
    position: 'absolute',
  },
});
