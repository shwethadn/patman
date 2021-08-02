import {observable, action, decorate} from 'mobx';

class DataStore {
  // store variables
  @observable labReports = null;
  @observable prescriptions = null;

  // Creating Actions
  @action setLabReports = (list) => {
    if (list && list.response) {
      this.labReports = list.response;
    } else {
      this.labReports = [];
    }
  };

  @action setPrescriptions = (list) => {
    if (list && list.response) {
      this.prescriptions = list.response;
    } else {
      this.prescriptions = [];
    }
  };
}

const dataStore = new DataStore();
export default dataStore;
