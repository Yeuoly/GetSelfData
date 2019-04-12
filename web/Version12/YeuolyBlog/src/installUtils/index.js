import Vue from 'vue'
import {GlobalCommunication} from "../js/GlobalCommunication"
import echarts from 'echarts'
import store from '../store'

let utils = {

    getScrollHeight  () {
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },

    getWindowHeight () {
        let windowHeight = 0;
        if (document.compatMode === "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },

    getDocumentTop () {
        let scrollTop =  0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },

    messageBox (payload , type) {
        if (typeof payload !== 'object') {
            if (typeof payload === 'string' && typeof type !== 'string') {
                payload = {content: payload, type: 'normal'};
            } else if (typeof payload !== 'string' && typeof type !== 'string') {
                payload = {content: 'none', type: 'normal'};
            }
            if (typeof payload === 'string' && typeof type === 'string') {
                payload = {content: payload, type: type};
            } else if (typeof payload !== 'string' && typeof type === 'string') {
                payload = {content: 'none', type: type};
            }
        }
        GlobalCommunication.$emit('MessageBox', payload);
    },

    date(format, timestamp){
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let res = '';
        for(let i in format){
            if(format[i] === 'Y'){
                res += date.getFullYear();
            }else if(format[i]  === 'M'){
                res += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
            }else if(format[i]  === 'D'){
                res += date.getDate();
            }else if(format[i]  === 'h'){
                res += date.getHours();
            }else if(format[i]  === 'm'){
                res += date.getMinutes();
            }else if(format[i]  === 's'){
                res += date.getSeconds();
            }else{
                res += format[i] ;
            }
        }
        return res;
    },

    valueCounter(o){
        let t = typeof o;
        if(t === 'string'){
            return o.length;
        }else if(t === 'object'){
            let n = 0;
            for(let i in o){
                n++;
            }
            return n;
        }
        return false;
    },

    onFirstLoadUserInfo(func){
        if(store.getters.userInfo.firstLoad)
            func();
        else
            GlobalCommunication.$on('firstLoadOver',func);
    }
};

Vue.prototype.$utils = utils;
Vue.prototype.$echarts = echarts;