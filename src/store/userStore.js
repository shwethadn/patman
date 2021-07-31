import {observable, action, decorate} from 'mobx';

class UserStore {
  // store variables
  @observable currentUser = null;

  // Creating Actions
  @action setCurrentUser = (user) => {
    if (user) {
      this.currentUser = user;
    } else {
      this.currentUser = null;
    }
  };
}

const userStore = new UserStore();
export default userStore;
