import Vue from 'vue'
import App from './App.vue'
import { router } from './router'

Vue.config.productionTip = false;

let user_data = {
  user_id: '未登录，点击登录',
  user_uid: '-1',
  user_email: 'example@google.com',
  user_lv: '0',
  user_exp: '0',
  user_class: '',
  avatar: '',
  srm_jct: '',
  login_time: '0',
  online: true
};

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

function getUserData (index) {
    if(typeof index === 'undefined'){
      return user_data;
    }
    if(typeof user_data[index] !== 'undefined'){
      return user_data[index];
    }
    return null;
}

export {
    getUserData,
    user_data
}