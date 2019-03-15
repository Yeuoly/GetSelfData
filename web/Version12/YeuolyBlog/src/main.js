import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';

//安装工具类
import Utils from './installUtils';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app');