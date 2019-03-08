import Vuex from 'vuex'
import Vue from 'vue'

import UserInfo from './UserInfo';

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        UserInfo : UserInfo
    }
});
