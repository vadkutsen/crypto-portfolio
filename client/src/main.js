import Vue from 'vue';
import VueMeta from 'vue-meta';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import tooltipDirective from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import Loader from '@/components/app/Loader.vue';
// import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

// import 'firebase/auth';
// import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

// firebase.initializeApp({
//   apiKey: 'AIzaSyAaeaWx9JMkHvr5Msx5QDJYUW05ONHwTww',
//   authDomain: 'vue-crm-d9e52.firebaseapp.com',
//   databaseURL: 'https://vue-crm-d9e52.firebaseio.com',
//   projectId: 'vue-crm-d9e52',
//   storageBucket: 'vue-crm-d9e52.appspot.com',
//   messagingSenderId: '425925629388',
//   appId: '1:425925629388:web:759d15f8d390654adb7969',
// });

let app;

if (!app) {
      app = new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount('#app');
    }




// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");





// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount('#app');
//   }
// });
