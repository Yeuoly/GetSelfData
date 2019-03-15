import Vue from 'vue'
import {GlobalCommunication} from "../js/GlobalCommunication";

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
    }
};

Vue.prototype.$utils = utils;