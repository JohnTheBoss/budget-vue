function initialState() {
  return {
    authUser: {
      avatar: null,
      displayName: null,
      email: null,
      uid: null
    }
  };
}

const state = () => initialState();

const getters = {
  isLoggedIn: state => {
    try {
      return state.authUser.uid !== null;
    } catch {
      return false;
    }
  }
};

const mutations = {
  RESET_STORE: state => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      avatar: authUser.PhotoUrl === null ? authUser.PhotoUrl : null,
      displayName: authUser.displayName,
      email: authUser.email
    };
  },

  UPDATE_DISPLAYNAME: (state, displayName) => {
    state.authUser.displayName = displayName;
  },

  UPDATE_EMAIL: (state, newEmail) => {
    state.authUser.email = newEmail;
  }
};

const actions = {
  handleSuccessfulAuthentication({ commit }, { authUser, claims }) {
    commit("SET_AUTH_USER", { authUser });
    // Load Transactions
    this.dispatch("transactions/getTransactions");
  },

  async logoutUser({ commit, dispatch }) {
    try {
      await this.$fireAuth.signOut();
    } catch (e) {
      // Do nothing, not properly signed in anyway.
      console.error(e);
    } finally {
      // Reset store
      commit("RESET_STORE");
    }
  },

  // TODO: if email change logout user!
  async updateUserData({ commit, state }, userInfo) {
    try {
      const user = this.$fireAuth.currentUser;
      let credential;
      let changeArr = [];

      const oldData = {
        name: state.authUser.displayName,
        email: state.authUser.email
      };

      if (oldData.name !== userInfo.name) {
        changeArr.push("name");
        await user
          .updateProfile({
            displayName: userInfo.name
          })
          .then(() => {
            commit("UPDATE_DISPLAYNAME", userInfo.name);
            return "DISPLAYNAME_OK";
          });
      }

      if (oldData.email !== userInfo.email) {
        changeArr.push("email");
        user
          .updateEmail(userInfo.email)
          .then(() => {
            commit("UPDATE_EMAIL", userInfo.email);
            return "EMAIL_OK";
          })
          .catch(error => {
            alert(error);
          });
      }

      if(changeArr.length === 2){
        return "ALL_DATA_UPDATED_PLS_RELOGIN";
      } else if(changeArr.length > 0) {
        return "UPDATED_"+changeArr[0];
      } else {
        return "NO_UPDATE";
      }

    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
