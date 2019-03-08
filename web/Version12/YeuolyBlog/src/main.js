import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import { GlobalCommunication } from "./js/GlobalCommunication";
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$messageBox = function (payload) {
    if(typeof payload !== 'object')
    {
        if(typeof payload === 'string')
        {
            payload = { content : payload , type : 'normal'};
        }else{
            payload = { content : 'none' , type : 'normal'};
        }
    }
    GlobalCommunication.$emit('MessageBox',payload);
};

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app');