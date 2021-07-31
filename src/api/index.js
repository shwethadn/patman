import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import service from './service';
// Service APIs
import AuthAPI from './auth';
import UserAPI from './user';

//Store actions
import userStore from '../store/userStore';

// const API_URL = Config.API_URL;
// const API_URL = 'https://mighty-headland-66775.herokuapp.com/api/v1/';
const API_URL = 'https://patman.herokuapp.com/api/v1/';

class APIhandler {
  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }

  setAuthHeader = (token) => {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  removeAuthHeader = () => {
    delete this.axios.defaults.headers.common.Authorization;
  };

  login = async params => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log(params);
      let response = await AuthAPI.login(params);
      if (response.access_token) {
        try {
          service.setAuthHeader(response.access_token);
          this.setAuthHeader(response.access_token);
          await AsyncStorage.setItem('@auth_key', response.access_token);
          let meRes = await UserAPI.me();
          console.log("ME",meRes)
          if (meRes.response && meRes.response.type) {
            await AsyncStorage.setItem('@role', meRes.response.type);
            await AsyncStorage.setItem('@qr_code', meRes.response.qr_code);
          }
          console.log(meRes);
        } catch (e) {
          console.log(e);
        }
      }
      return response;
    } catch (e) {
      throw e;
    }
  };

  signup = async (params) => {
    // eslint-disable-next-line no-useless-catch
    try {
      let response = await AuthAPI.signup(params);
      if (response.access_token) {
        try {
          service.setAuthHeader(response.access_token);
          this.setAuthHeader(response.access_token);
          await AsyncStorage.setItem('@auth_key', response.access_token);
          await UserAPI.me();
        } catch (e) {
          console.log(e);
        }
      }
      return response;
    } catch (e) {
      throw e;
    }
  };

  me = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      let meRes = await UserAPI.me();
      if (meRes.response) {
        userStore.setCurrentUser(meRes.response);
      }
      return meRes;
    } catch (e) {
      throw e;
    }
  };

  signOut = async () => {
    try {
      let response = await UserAPI.signOut();
      await AsyncStorage.removeItem('@auth_key');
      await AsyncStorage.removeItem('@role');
      return response;
    } catch (e) {
      throw e;
    }
  };

  uploadPrescription = async (params) => {
    // eslint-disable-next-line no-useless-catch
    try {
      let response = await UserAPI.uploadPrescription(params);
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
  };

  requestPatient = async (params) => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log('requestPatient', params);
      let response = await UserAPI.requestPatient(params);
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
  };
}

const API = new APIhandler();
export default API;
