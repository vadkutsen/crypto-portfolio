import AuthService from '@/services/AuthService.js'

// const apiClient = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     Accept: 'application/json',
//   },
// })

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ dispatch, commit }, { email, password }) {
      try {
        AuthService.logIn({email, password})
          .then(response => {
            localStorage.userId = response.data.userId,
            localStorage.token = response.data.token
          })
      }catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    // eslint-disable-next-line no-unused-vars
    async register({ dispatch, commit }, { email, password, name }) {
      // eslint-disable-next-line no-useless-catch
      try {
      //   await firebase.auth().createUserWithEmailAndPassword(email, password);
        AuthService.register({ email, password, name })
        // const uid = await dispatch('getUid');
      //   await firebase.database().ref(`/users/${uid}/info`).set({
      //     bill: 10000,
      //     name,
      //   });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    getUid() {
      return localStorage.getItem('userId')
      // const user = firebase.auth().currentUser;
      // return user ? user.uid : null;
    },

    async logout({ commit }) {
      // await firebase.auth().signOut();
      commit('clearInfo');
    },
  },
};
