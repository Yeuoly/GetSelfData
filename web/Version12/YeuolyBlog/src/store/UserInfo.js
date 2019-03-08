export default {
    state : {
        user_id: '未登录，点击登录',
        user_uid: -1,
        user_email: 'example@example.com',
        user_lv: -1,
        user_exp: -1,
        user_class: '',
        avatar: '',
        srm_jct: '',
        login_time: -1,
        online: false,
    },
    getters : {
        userInfo(state){
            return state;
        }
    },
    mutations : {
        clearUserInfo(state) {
            for (let key in state)
            {
                if (typeof state.key === 'number')
                    state.key = -1;
                else if (typeof state.key === 'string')
                    state.key = 'NaN';
                else {}
            }
        },
        setUserInfo(state ,payload){
            for(let i in payload){
                if(typeof state[i] !== 'undefined')
                {
                    state[i] = payload[i];
                }
            }
        }
    }
}