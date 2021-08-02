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
	Alert,
  Image,
  Platform,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Block from '../../components/block';
import Header from '../../components/header';
import Modal from 'react-native-modal';
import IMAGE_PICKER from '../../components/imagePicker';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import API from '../../api';
import { TextInput } from 'react-native-gesture-handler';

const Upload = (props) => {

  const type = props.route.params?.type;

	const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show_image_picker, toggleImagePicker] = useState(false);
  const [imageResource, setImageResource] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [doctor, setDoctor] = useState({});
  const [showDoctor, setShowDoctor] = useState(false);

  let doctors = [
    {id: 3, name: 'Doctor1'},
    {id: 6, name: 'Doctor2'},
  ];

  useEffect(() => {
    console.log("UPLOAD");
  }, []);

  const uploadPrescription = async () => {
    setLoading(true);
    const form_payload = new FormData();
    form_payload.append('patient_id', 2);
    form_payload.append('doctor_id', doctor.id);
    if (imageResource && imageResource.uri) {
      form_payload.append('assets_attributes[0][asset]', {
        name: type + '_image.jpg',
        type: imageResource.type,
        uri:
          Platform.OS === 'android'
            ? imageResource.uri
            : imageResource.uri.replace('file://', ''),
      });
    }
    try {
      let response = await API.uploadPrescription(
        form_payload
      );
      console.log(response);
      setLoading(false);
      setTimeout(() => {
        props.navigation.goBack();
      }, 100);
    } catch (e) {
      setLoading(false);
    };
  };

  const uploadLabReport = async () => {
    setLoading(true);
    const form_payload = new FormData();
    form_payload.append('patient_id', 2);
    form_payload.append('doctor_id', doctor.id);
    if (imageResource && imageResource.uri) {
      form_payload.append('assets_attributes[0][asset]', {
        name: type + '_image.jpg',
        type: imageResource.type,
        uri:
          Platform.OS === 'android'
            ? imageResource.uri
            : imageResource.uri.replace('file://', ''),
      });
    }
    try {
      let response = await API.uploadLabReport(
        form_payload
      );
      console.log(response);
      setLoading(false);
      setTimeout(() => {
        props.navigation.goBack();
      }, 100);
    } catch (e) {
      setLoading(false);
    }
  };

  const onImageChange = (photo) => {
    setImageResource(photo);
    setImageURL(photo.uri);
    // getBase64FromUrl(photo.uri);
  };

  const closeNavImagePicker = () => {
    toggleImagePicker(false);
    props.navigation.goBack();
  };

  const closeImagePicker = () => {
    toggleImagePicker(false);
  };

  const onImageLoadEnd = () => {
    setImageLoading(false);
  };

  // const getBase64FromUrl = async (url) => {
  //   const data = await fetch(url);
  //   const blob = await data.blob();
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onloadend = () => {
  //       const base64data = reader.result;
  //       setBase64Image(base64data);
  //     };
  //   });
  // };

  const renderImageDetails = () => {
    if (imageURL) {
      return (
        <Image
          style={styles.imageView}
          source={{ uri: imageURL }}
          onLoadEnd={() => onImageLoadEnd()}
          onLoadStart={(e) => setImageLoading(true)}
        />
      );
    };
  };

  const renderUploadButton = () => {
    if (loading) {
      return (
        <Block style={styles.buttonContainer}>
          <ActivityIndicator color={colors.$white}/>
        </Block>
      );
    } else {
      return (
        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => type === 'Lab Report' ? uploadLabReport() : uploadPrescription()}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      );
    }
  };

  const onDoctorSelect = (d) => {
    setDoctor(d);
    setShowDoctor(false);
    toggleImagePicker(true);
  };

  const doctorVal = (d) => {
    return (
      <TouchableOpacity style={{paddingVertical: 15}}
        onPress={() => onDoctorSelect(d)}>
        <Text style={{fontSize: 16, fontWeight: doctor.id === d.id ? 'bold' : 'normal'}}>
          {d.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectDoctorOverlay = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={showDoctor}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setShowDoctor(false)}>
        <Block style={{height: '50%', paddingHorizontal: 40, borderRadius: 20}}>
          <Text style={{paddingVertical: 15, textAlign: 'center', fontSize: 16}}>
            Select Doctor
          </Text>
          <FlatList
            data={doctors}
            renderItem={({ item }) => doctorVal(item)}
            keyExtractor={(item) => item.id.toString()}
          />
        </Block>
      </Modal>
    );
  };

  const selectDoctor = () => {
    return(
      <Block style={{marginVertical: 20, width: '100%'}}>
        <TouchableOpacity style={{width: '100%'}} 
          onPress={() => setShowDoctor(true)}>
          <Input
            value={doctor.name}
            editable={false}
            placeholder="Select Doctor"
          />
        </TouchableOpacity>
      </Block>
    );
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
					<Text style={styles.headerText}>Upload {type}</Text>
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
      {imageURL || !(doctor && doctor.name) ? renderHeader() : null}
      <Block style={styles.container}>
        { !(doctor && doctor.name) ? selectDoctor() : null}
        {renderImageDetails()}
        {imageURL ? renderUploadButton() : null}
        <IMAGE_PICKER
          onChange={onImageChange}
          show={show_image_picker}
          close={closeImagePicker}
          closeAndNav={closeNavImagePicker}
          fromScreen={'AddTasks'}
        />
        {selectDoctorOverlay()}
      </Block>
    </>
  );
};

export default Upload;

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
  imageView: {
    height: 550,
    width: '110%',
  },
});
