import React, { useRef, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Linking,
  Text,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import BLOCK from './block';
import GalleryPicker from 'react-native-image-picker';
// import NHT_TEXT from '../../components/Text';
import NHT_HEADER from './header';
import { SvgXml } from 'react-native-svg';
import CameraCapture from '../utils/images/cameraCapture';
import GalleryIcon from '../utils/images/galleryIcon';
import FlipCamera from '../utils/images/flipCamera';

const ImagePicker = ({ show, onChange, close, closeAndNav, ...rest }) => {
  // Camera ref
  const camera = useRef(null);
  const [flash, setFlash] = useState(false);
  const [backCamera, setBackCamera] = useState(false);

  const imagePickerOptions = {
    quality: 0.5,
    maxWidth: 1080,
    maxHeight: 1920,
    storageOptions: {
      skipBackup: true,
    },
    noData: true,
  };

  // Launch Gallery
  const launchImageLibrary = () => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        GalleryPicker.launchImageLibrary(imagePickerOptions, (response) => {
          onImageChange(response);
        });
      }, 300);
    } else {
      GalleryPicker.launchImageLibrary(imagePickerOptions, (response) => {
        onImageChange(response);
      });
    }
  };

  // Capture picture
  const capturePicture = async () => {
    if (camera) {
      const options = {
        quality: 0.5,
        maxWidth: 1080,
        maxHeight: 1920,
        fixOrientation: true,
        forceUpOrientation: true,
      };
      try {
        const data = await camera.current.takePictureAsync(options);
        data.type = 'image/jpeg';
        onImageChange(data);
      } catch (err) {
        Alert.alert('Alert', 'Failed to take picture: ' + (err.message || err));
        return;
      }
    }
  };

  const flashOnAndOff = () => {
    setFlash(!flash);
  };

  // on change handler
  const onImageChange = (response) => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
      // closeAndNav ? closeAndNav() : close();
      // close();
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      closeAndNav ? closeAndNav() : close();
    } else if (response.customButton) {
      // close();
      closeAndNav ? closeAndNav() : close();
      console.log('User tapped custom button: ', response.customButton);
    } else {
      if (response.uri) {
        onChange(response);
        close();
      } else {
        close();
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Something went wrong, try again',
            ToastAndroid.SHORT,
          );
        }
      }
    }
  };

  const renderHeader = () => {
    return (
      <NHT_HEADER
        style={[
          styles.shadowHeaderStyle,
          { marginBottom: 0, marginTop: Platform.OS === 'ios' ? 40 : 0 }
        ]}>
        <NHT_HEADER.Left />
        <NHT_HEADER.Body>
          <Text style={styles.headerBodyText}>Photo</Text>
        </NHT_HEADER.Body>
        <NHT_HEADER.Right>
          <TouchableOpacity>
            <Icon
              name="close"
              type="material-icons"
              color="#282828"
              onPress={closeAndNav ? closeAndNav : close}
              size={25}
            />
          </TouchableOpacity>
        </NHT_HEADER.Right>
      </NHT_HEADER>
    );
  };

  const cameraType = () => {
    setBackCamera(!backCamera);
  };

  return (
    <Modal
      visible={show}
      onRequestClose={() => {
        closeAndNav ? closeAndNav() : close();
      }}
      {...rest}>
      {renderHeader()}
      <RNCamera
        ref={camera}
        captureAudio={false}
        style={styles.preview}
        type={
          backCamera
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ status }) => {
          console.log(status);
            if (status === 'NOT_AUTHORIZED') {
              return (
                <BLOCK style={styles.camerAccess}>
                  <Text center style={styles.permissionText}>
                    Please enable your camera permission to start
                  </Text>
                  <BLOCK center>
                    <TouchableOpacity
                      style={styles.enableContainer}
                      onPress={() => Linking.openSettings()}>
                      <Text style={styles.enableText}>Enable Camera</Text>
                    </TouchableOpacity>
                  </BLOCK>
                </BLOCK>
              );
            }
          }}
      </RNCamera>
      <BLOCK
        row
        middle
        paddingX
        paddingXSize={'md'}
        style={styles.cameraActions}>
        <BLOCK style={{ top: 22 }}>
          <TouchableOpacity onPress={launchImageLibrary}>
            <SvgXml xml={GalleryIcon} />
          </TouchableOpacity>
        </BLOCK>
        <BLOCK style={styles.cameraCaptureIcon}>
          <TouchableOpacity onPress={capturePicture}>
            <SvgXml xml={CameraCapture} />
          </TouchableOpacity>
        </BLOCK>
        <BLOCK style={styles.flipCameraIcon}>
          <TouchableOpacity onPress={cameraType}>
            <SvgXml xml={FlipCamera} />
          </TouchableOpacity>
        </BLOCK>
      </BLOCK>
    </Modal>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  camerAccess: {
    flex: 0,
    justifyContent: 'center',
    width: '100%',
  },
  cameraActions: {
    alignItems: 'flex-end',
    display: 'flex',
    height: 200,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    width: '100%',
  },
  cameraCaptureIcon: {
    marginRight: 30,
  },
  enableContainer: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    // margin: 20,
  },
  enableText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  flipCameraIcon: {
    bottom: 5,
    marginRight: 25,
  },
  headerBodyText: {
    color: '#000000',
    // fontFamily: "sf-ui-display-medium",
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    height: 80,
    paddingBottom: Platform.OS === 'ios' ? 10 : 40,
    paddingRight: 20,
    paddingTop: 0,
  },
  permissionText: {
    color: '#141414',
    fontFamily:
      Platform.OS === 'ios' ? 'OpenSans-Regular' : 'OpenSans_Regular',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 5,
    textAlign: 'center',
  },
  preview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  shadowHeaderStyle: {
    elevation: 1,
    borderBottomWidth: 0,
    borderColor: '#e5e5e5',
  },
});
