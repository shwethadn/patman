import {observable, action, decorate} from 'mobx';

// class UserStore {
//   // store variables
//   currentUser = null;

//   // Creating Actions
//   setCurrentUser(user) {
// 		console.log("Store", user);
//     if (user) {
//       this.currentUser = user;
//     } else {
//       this.currentUser = null;
//     }
//   }
// }

// // decorate
// decorate(UserStore, {
//   currentUser: observable,
//   setCurrentUser: action,
// });

// const userStore = new UserStore();
// export default userStore;

class UserStore {
  // store variables
  @observable currentUser = null;

  // Creating Actions
  @action setCurrentUser = (user) => {
		console.log("Store", user);
    if (user) {
      this.currentUser = user;
    } else {
      this.currentUser = null;
    }
  }
}

const userStore = new UserStore();
export default userStore;
