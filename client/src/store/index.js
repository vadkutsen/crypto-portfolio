import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';
import AssetService from '../services/AssetService'
// import PriceService from '../services/PriceService'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },

  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },

  actions: {
    // async fetchCurrency() {
    //   const key = process.env.VUE_APP_ER;
    //   const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`);
    //   // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,PLN`);
    //   return res.json();
    // },
    async fetchAssets() {
      const res = await AssetService.getAssets()
      return res.data;
    },
    async fetchAssetById({}, id) {
      const res = await AssetService.getAssetById(id)
      console.log('store id: ' + id)
      return res.data;
    },
    // async fetchPrices() {
    //   const res = await PriceService.getPrices()
    //   return res.data;
    // },
  },

  getters: {
    error: (s) => s.error,
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
