import Vue from 'vue'
import {GlobalCommunication} from "../js/GlobalCommunication";
import echarts from 'echarts'

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
        let Y = date.getFullYear();
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        let D = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let res = '';
        for(let i in format){
            if(format[i] === 'Y'){
                res += Y;
            }else if(format[i]  === 'M'){
                res += M;
            }else if(format[i]  === 'D'){
                res += D;
            }else if(format[i]  === 'h'){
                res += h;
            }else if(format[i]  === 'm'){
                res += m;
            }else if(format[i]  === 's'){
                res += s;
            }else{
                res += format[i] ;
            }
        }
        return res;
    }
};

Vue.prototype.$utils = utils;
Vue.prototype.$echarts = echarts;

