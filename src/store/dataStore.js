import {observable, action, decorate} from 'mobx';

class DataStore {
  // store variables
  @observable labReports = null;
  @observable prescriptions = null;

  // Creating Actions
  @action setLabReports = (list) => {
	  console.log("Store", list);
    if (list && list.response) {
      this.labReports = list.response;
    } else {
      this.labReports = null;
    }
  };

  @action setPrescriptions = (list) => {
	  console.log("Store", list);
    if (list && list.response) {
      this.prescriptions = list.response;
    } else {
      this.prescriptions = null;
    }
  };
}

const dataStore = new DataStore();
export default dataStore;
