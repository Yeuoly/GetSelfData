<template>
    <div id="login-page">
        <div id="login-title">登录</div>
        <Account
                placeholder="账号"
                type="text"
                :keyup="verifyFormat"
                keyupP="account"
                ID="input-account"
                ref="Account"
        />
        <Password
                placeholder="密码"
                type="password"
                :keyup="verifyFormat"
                keyupP="password"
                ID="input-password"
                ref="Password"
        />
        <button @click="login">登录</button>
        <router-view></router-view>
    </div>
</template>

<script>

    import PassportInput from '../common/PassportInput';
    import { BaseModule } from "../../js/module";
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { Pattern } from "../../js/GlobalUtils";
    import { router } from "../../router";

    export default {
        components : {
            Account : PassportInput,
            Password : PassportInput
        },
        name : 'LoginPage',
        data () {
            return {
                format_allowed_password : false,
                format_allowed_account : false,
            }
        },
        computed : {
            getAccount(){
                return this.$refs.Account.model;
            },
            getPassword(){
                return this.$refs.Password.model;
            }
        },
        methods : {
            setAccountTip(tip){
                this.$refs.Account.setTip(tip);
            },
            setPswdTip(tip){
                this.$refs.Password.setTip(tip);
            },
            verifyFormat (method) {
                if(method === 'account')
                {
                    if(this.getAccount.length < 6)
                    {
                        this.setAccountTip('这么短小的嘛OωO');
                        this.format_allowed_account = false;
                    }
                    else if(this.getAccount.length > 16)
                    {
                        this.setAccountTip('好长。。要死啦。。');
                        this.format_allowed_account = false;
                    }
                    else if(!Pattern.account.test(this.getAccount))
                    {
                        this.setAccountTip('奇奇怪怪的名字是不可以的哦');
                        this.format_allowed_account = false;
                    }
                    else
                    {
                        this.setAccountTip('');
                        this.format_allowed_account = true;
                    }
                }
                else if(method === 'password')
                {
                    if(this.getPassword.length < 6)
                    {
                        this.setPswdTip('这么短小的嘛OωO');
                        this.format_allowed_password = false;
                    }
                    else if(this.getPassword.length > 16)
                    {
                        this.setPswdTip('好长。。要死啦。。');
                        this.format_allowed_password = false;
                    }
                    else if(!Pattern.password.test(this.getPassword))
                    {
                        this.setPswdTip('密码也是不允许变得奇怪的哦');
                        this.format_allowed_password = false;
                    }
                    else
                    {
                        this.setPswdTip('');
                        this.format_allowed_password = true;
                    }
                }
            },
            login () {
                if(!this.format_allowed_account || !this.format_allowed_password )
                {
                    this.$utils.messageBox('麻烦看一看上面的提示啦！','warn');
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
                            this.$utils.messageBox(value.data.error,'warn');
                        }
                    },
                    () => {
                        this.$utils.messageBox('遇到意外的错误','warn');
                    }
                );
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    #login-page{
        margin: 0 auto;
    }

    #login-title{
        margin: 0 auto;
        height: 56px;
        line-height: 56px;
        text-align: center;
        padding: 0 20px;
        font-size: 40px;
        background: transparent;
        color: rgba(44,62,80,0.6);
        padding-bottom: 30px;
    }


</style>