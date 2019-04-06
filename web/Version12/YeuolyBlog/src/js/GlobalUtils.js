import { InfoModule } from "./module-alpha";
import Vue from 'vue';

export let DataGroup = {
    //登录检测成功之后执行
    userOnloadNextTick : []
};

export let Pattern = {
    account : /^[a-zA-Z0-9_]{0,}$/,
    password : /^[a-zA-Z0-[\.*\+_\@#&\$!=\(\)\^-]{0,}$/,
    email : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\\.-])+\.([A-Za-z]{2,4})$/,
    phoneNumber : /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
    length6To16 : /^.{6,16}$/
};