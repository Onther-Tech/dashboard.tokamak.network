import Vue from 'vue';
import Notifications from 'vue-notification';
import VueGtag from 'vue-gtag';

Vue.use(Notifications);
Vue.use(VueGtag, {
  config: {
    id: 'G-THXJF26LWP',  // Google Analytics의 Tracking ID를 넣어준다
  },
});

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/960.css';
// import '@/assets/css/reset.css';
import '@/assets/css/text.css';
import * as filters from '@/filters';

// https://vuedose.tips/tips/measure-runtime-performance-in-vue-js-apps
const isDev = process.env.NODE_ENV !== 'production';
Vue.config.performance = isDev;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
