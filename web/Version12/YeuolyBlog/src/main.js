import Vue from 'vue';
import App from './App.vue';
import InstallFunction from './installFunctinos';
import { router } from './router';
import { GlobalCommunication } from "./js/GlobalCommunication";
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$messageBox = function (payload , type) {
    if(typeof payload !== 'object')
    {
        if(typeof payload === 'string' && typeof type !== 'string')
        {
            payload = { content : payload , type : 'normal'};
        }else if(typeof payload !== 'string' && typeof type !== 'string'){
            payload = { content : 'none' , type : 'normal'};
        }
        if(typeof payload === 'string' && typeof type === 'string')
        {
            payload = { content : payload , type : type};
        }else if(typeof payload !== 'string' && typeof type === 'string'){
            payload = { content : 'none' , type : type};
        }
    }
    GlobalCommunication.$emit('MessageBox',payload);
};

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app');