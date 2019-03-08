<template>
    <div class="login-page">
        <label for="input-passport-account">
            <input id="input-passport-account"
                   class="font-normal-size"
                   type="text"
                   placeholder="账号"
                   v-model="account"
                   @keyup="verifyFormat('account')"
            >
            <span id="tip-passport-account">
                {{account_tip}}
            </span>
        </label>
        <label for="input-passport-password">
            <input id="input-passport-password"
                   class="font-normal-size"
                   type="password"
                   placeholder="密码"
                   v-model="password"
                   @keyup="verifyFormat('password')"
            >
            <span id="tip-passport-password">
                {{password_tip}}
            </span>
        </label>
        <button @click="login">登录</button>
    </div>
</template>

<script>

    import { BaseModule } from "../js/module";
    import { GlobalCommunication } from "../js/GlobalCommunication";
    import { Pattern } from "../js/GlobalUtils";
    import { FunctionGroup } from "../js/GlobalUtils";
    import { router } from "../router";

    export default {
        name : 'LoginPage',
        data () {
            return {
                account : '',
                password : '',
                account_tip : '',
                password_tip : '',
                format_allowed_password : false,
                format_allowed_account : false
            }
        },
        methods : {
            verifyFormat (method) {
                if(method === 'account')
                {
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
                        this.account_tip = '';
                        this.format_allowed_account = true;
                    }
                }
                else if(method === 'password')
                {
                    if(!Pattern.length6To16.test(this.password))
                    {
                        this.password_tip = '这么短小的嘛qwq';
                        this.format_allowed_password = false;
                    }
                    else if(this.password.length > 16)
                    {
                        this.account_tip = '好长啊。。要死啦';
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
                }
            },
            login () {
                if(!this.format_allowed_account || !this.format_allowed_password )
                {
                    FunctionGroup.alertBox('麻烦看一看上面的提示啦！');
                    return;
                }
                let vm = this;
                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('Login.php',BaseModule.dir_api),
                    {
                        act : vm.account,
                        pswd : vm.password
                    },
                    (value) => {
                        if(value.data.res === 666){
                            router.replace('/');
                            GlobalCommunication.$emit('refreshUserData');
                        } else {
                            FunctionGroup.alertBox(value.data.error);
                        }
                    },
                    () => {
                        FunctionGroup.alertBox('遇到意外的错误');
                    }
                );
            }
        },
        created() {

        }
    }
</script>

<style>

</style>