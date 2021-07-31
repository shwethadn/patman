import Axios from 'axios';
// const API_URL = 'https://mighty-headland-66775.herokuapp.com/api/v1/';
// const API_URL = 'https://patman.herokuapp.com/api/v1/';
// const API_URL = 'https://7649396cccdc.ngrok.io/api/v1/';
const API_URL = 'http://c32471426418.ngrok.io/api/v1';

class ApiServices {
  // Set the client
  constructor() {
    const client = Axios.create({
      baseURL: API_URL,
    });

    this.client = client;
    this.client.defaults.headers.common.Accept = 'application/json';
    this.client.defaults.headers.common['Content-Type'] =
      'application/json, */*';
  }

  // Util for Setting header for All next requests
  setAuthHeader = (token) => {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  // Drop Auth header for logout
  removeAuthHeader = () => {
    delete this.client.defaults.headers.common.Authorization;
  };

  // Gets req
  async get(path) {
    try {
      const resp = await this.client.get(path);
      return resp.data;
    } catch (err) {
      console.log('Get req', err);
      if (err.response === undefined) throw new Error('Network Error');
      else return err.response;
    }
  }

  // post req
  async post(path, payload, getProgressValues) {
    try {
      this.client.defaults.headers.common['Content-Type'] =
        'multipart/form-data';
      const config = {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = progressEvent.loaded / progressEvent.total;
          if (getProgressValues) {
            getProgressValues(percentCompleted);
          }
        },
      };
			console.log(payload);
      const resp = await this.client.post(path, payload, config);
      return resp.data;
    } catch (err) {
			console.log(err.response);
      if (err.response === undefined) throw new Error('Network Error');
			else if (err.response.status === 401) return {message: "mobile or password is wrong", success: false};
      else return err.response;
    }
  }

  // Put req
  async put(path, payload, getProgressValues) {
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = progressEvent.loaded / progressEvent.total;
          if (getProgressValues) {
            getProgressValues(percentCompleted);
          }
        },
      };
      const resp = await this.client.put(path, payload, config);
      return resp.data;
    } catch (err) {
      console.log('Put req', err);
      if (err.response === undefined) throw new Error('Network Error');
      else return err.response;
    }
  }

  // Delete req
  async delete(path) {
    try {
      const resp = await this.client.delete(path);
      return resp.data;
    } catch (err) {
      console.log('Del req', err);
      if (err.response === undefined) throw new Error('Network Error');
      else return err.response;
    }
  }

  // Patch req
  async patch(path) {
    try {
      const resp = await this.client.patch(path);
      return resp.data;
    } catch (err) {
      console.log('Patch req', err);
      if (err.response === undefined) throw new Error('Network Error');
      else return err.response;
    }
  }
}

export default new ApiServices();
