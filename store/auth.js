import firebase from "firebase";

export const state = () => ({
  uid: localStorage.getItem("auth_userInfo")
    ? JSON.parse(localStorage.getItem("auth_userInfo")).uid
    : null,
  user: localStorage.getItem("auth_userInfo")
    ? JSON.parse(localStorage.getItem("auth_userInfo"))
    : null
});

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid;
    else return null;
  },

  user(state) {
    return state.user;
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid;
  }
};

export const actions = {
  async login({ dispatch, state }, { email, password }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async firebaseUser => {
        const user = firebaseUser.user;
        const token = await firebase.auth().currentUser.getIdToken(true);
        const userInfo = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          uid: user.uid,
          token: token
        };
        localStorage.setItem("auth_userInfo", JSON.stringify(userInfo));
        await dispatch("setUSER", userInfo);
        await dispatch("saveUID", userInfo.uid);
      })
      .then(() => {
        this.app.router.push("/");
      })
      .catch(e => {
        throw e;
      });
  },

  async signUp({ dispatch, state }, { email, password }) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch("login", {
          email: email,
          password: password
        }).then(() => {
          this.app.router.push("/");
        });
      })
      .catch(e => {
        throw e;
      });
  },
  async logout({ commit, dispatch }) {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("auth_userInfo");
        commit("setUSER", null);
        commit("saveUID", null);
      })
      .then(() => {
        this.app.router.push("/auth");
      });
  },

  saveUID({ commit }, uid) {
    commit("saveUID", uid);
  },

  setUSER({ commit }, user) {
    commit("setUSER", user);
  }
};

export const mutations = {
  saveUID(state, uid) {
    state.uid = uid;
  },
  setUSER(state, user) {
    state.user = user;
  }
};
