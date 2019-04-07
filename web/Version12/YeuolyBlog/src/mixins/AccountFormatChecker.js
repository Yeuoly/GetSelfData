/**
 * This is a Vue-mixin Object
 */
import { GlobalCommunication } from "../js/GlobalCommunication"
import { InfoModule } from "../js/module-alpha"
import { Pattern } from "../js/GlobalUtils";

export let AccountFormatChecker = {
    data() {
        return {
            account : '',
            account_tip : '',
            password : '',
            password_tip : '',
            repeat_password : '',
            repeat_password_tip : '',
            email : '',
            email_tip : '',
            normal_captcha : '',
            normal_captcha_tip : '',
            email_captcha : '',
            email_captcha_tip : '',
            format_allowed_account : false,
            format_allowed_password : false,
            format_allowed_repeat_password : false,
            format_allowed_email : false,
        }
    },
    methods : {
        formatChecker(method){
            switch (method) {
                case 'account':
                    if(this.account.length < 6)
                    {
                        this.account_tip = '这么短小的嘛qwq';
                        this.format_allowed_account = false;
                    }
                    else if(this.account.length > 16)
                    {
                        this.account_tip = '好长啊。。要死啦';
                        this.format_allowed_account = false;
                    }
                    else if(!Pattern.account.test(this.account))
                    {
                        this.account_tip = '奇奇怪怪的名字是不可以的哦';
                        this.format_allowed_account = false;
                    }
                    else
                    {
                        if(!this.querying)
                        {
                            this.querying = true;
                            setTimeout( () => {
                                GlobalCommunication.$emit('httpPost',
                                    InfoModule.getUrlPath('account/v1/FindUser.php',InfoModule.dir_api),
                                    {
                                        n : this.account
                                    },
                                    (data) => {
                                        if(data.data['find'] === true)
                                        {
                                            this.account_tip = '这个名字已经被占用了哦~';
                                            this.format_allowed_account = false;
                                        }else{
                                            this.account_tip = '';
                                            this.format_allowed_account = true;
                                        }
                                    },
                                    () => {
                                        this.account_tip = '阿拉啦服务器好像坏掉惹';
                                        this.format_allowed_account = false;
                                    }
                                );
                                this.querying = false;
                            } ,1000);
                        }
                    }
                    break;
                case 'password':
                    if(this.password.length < 6)
                    {
                        this.password_tip = '这么短小的嘛qwq';
                        this.format_allowed_password = false;
                    }
                    else if(this.password.length > 16)
                    {
                        this.password_tip = '好长啊。。要死啦';
                        this.format_allowed_password = false;
                    }
                    else if(!Pattern.password.test(this.password))
                    {
                        this.password_tip = '密码也是不允许变得奇怪的哦';
                        this.format_allowed_password = false;
                    }
                    else
                    {
                        this.password_tip = '';
                        this.format_allowed_password = true;
                    }
                    break;
                case 'repeatPassword':
                    if(this.repeat_password !== this.password)
                    {
                        this.repeat_password_tip = '主人的两次密码不一样哦~';
                        this.format_allowed_repeat_password = false;
                    }else{
                        this.repeat_password_tip = '';
                        this.format_allowed_repeat_password = true;
                    }
                    break;
                case 'email':
                    if(!Pattern.email.test(this.email))
                    {
                        this.email_tip = '好奇怪的邮箱诶。。';
                        this.format_allowed_email = false;
                    }else{
                        this.email_tip = '';
                        this.format_allowed_email = true;
                    }
                    break;
                case 'normalCaptcha':
                    break;
                case 'emailCaptcha':
                    break;
            }
        },
    }

};