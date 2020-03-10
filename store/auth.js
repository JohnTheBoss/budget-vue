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
      avatar: authUser.PhotoUrl,
      displayName: authUser.displayName,
      email: authUser.email
    };
  }
};

const actions = {
  handleSuccessfulAuthentication({ commit }, { authUser, claims }) {
    commit("SET_AUTH_USER", { authUser });
    // Load Transactions
    this.dispatch('transactions/getTransactions');
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
