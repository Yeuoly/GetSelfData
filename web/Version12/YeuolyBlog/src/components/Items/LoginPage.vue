<template>
    <div id="login-page">
        <Title title="&#xe600; 登录" />
        <div class="input-group">
            <Account
                    placeholder="账号"
                    type="text"
                    @VKeyup="verifyFormat('account')"
                    v-model="account"
                    :tip="account_tip"
                    ID="input-account"
            />
            <Password
                    placeholder="密码"
                    type="password"
                    @VKeyup="verifyFormat('password')"
                    v-model="password"
                    :tip="password_tip"
                    ID="input-password"
            />
        </div>
        <div class="btn-group">
            <LoginBtn
                    @VClick="login"
                    :enable="format_allowed_account && format_allowed_password"
                    content="&#xe600; 登录"
                    class-name="login-btn yb-icon-font"
            />
            <RegisterBtn
                    @VClick="register"
                    :enable="true"
                    content="&#xe71c; 注册"
                    class-name="register-btn yb-icon-font"
            />
        </div>
    </div>
</template>

<script>

    import PassportInput from '../Common/PassportInput';
    import CommonButton from '../Common/CommonButton';
    import Title from '../Common/PassportTitle';
    import { BaseModule } from "../../js/module";
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { Pattern } from "../../js/GlobalUtils";

    export default {
        components : {
            Title : Title,
            Account : PassportInput,
            Password : PassportInput,
            LoginBtn : CommonButton,
            RegisterBtn : CommonButton
        },
        name : 'LoginPage',
        data () {
            return {
                account : '',
                password : '',
                account_tip : '',
                password_tip : '',
                format_allowed_password : false,
                format_allowed_account : false,
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
                }
            },
            login () {
                let vm = this;
                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('Login.php',BaseModule.dir_api),
                    {
                        act : vm.account,
                        pswd : vm.password
                    },
                    (value) => {
                        if(value.data.res === 666){
                            this.$utils.messageBox('登录成功');
                            setTimeout(() => {
                                document.location = BaseModule.getUrlPath('',BaseModule.dir_web);
                            }, 500);
                        } else {
                            this.$utils.messageBox(value.data.error,'warn');
                        }
                    },
                    () => {
                        this.$utils.messageBox('遇到意外的错误','warn');
                    }
                );
            },
            register () {
                this.$router.push({ name : 'register' });
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

    .btn-group{
        min-height: 30px;
        width: 80%;
        margin: 0 auto;
        position: relative;
    }

    .login-btn{
        position: absolute;
        width: 30%;
        right: calc((100% / 2) + 10px);
    }

    .register-btn{
        position: absolute;
        width: 30%;
        left: calc((100% / 2) + 10px);
    }
</style>