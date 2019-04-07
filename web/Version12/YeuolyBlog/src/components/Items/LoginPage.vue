<template>
    <div id="login-page">
        <Title title="&#xe600; 登录" />
        <form class="input-group">
            <Account
                    placeholder="账号"
                    type="text"
                    @VKeyup="formatChecker('account')"
                    v-model="account"
                    :tip="(account_tip === '这个名字已经被占用了哦~' )? '' : (format_allowed_account ? '不存在这个账号' : account_tip) "
                    ID="input-account"
            />
            <Password
                    placeholder="密码"
                    type="password"
                    @VKeyup="formatChecker('password')"
                    v-model="password"
                    :tip="password_tip"
                    ID="input-password"
            />
        </form>
        <div class="btn-group">
            <LoginBtn
                    @VClick="login"
                    :enable="((account_tip === '这个名字已经被占用了哦~' )? true : false)&& format_allowed_password"
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

    import TipInput from '../Common/TipInput';
    import CommonButton from '../Common/CommonButton';
    import Title from '../Common/PassportTitle';
    import { InfoModule } from "../../js/module-alpha";
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { Pattern } from "../../js/GlobalUtils";
    import { AccountFormatChecker } from "../../mixins/AccountFormatChecker";

    export default {
        components : {
            Title : Title,
            Account : TipInput,
            Password : TipInput,
            LoginBtn : CommonButton,
            RegisterBtn : CommonButton
        },
        name : 'LoginPage',
        methods : {
            login () {
                let vm = this;
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('account/v1/Login.php',InfoModule.dir_api),
                    {
                        act : vm.account,
                        pswd : vm.password
                    },
                    (value) => {
                        if(value.data.res === 666){
                            this.$utils.messageBox('登录成功');
                            setTimeout(() => {
                                document.location = InfoModule.getUrlPath('',InfoModule.dir_web);
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
        mixins : [AccountFormatChecker],
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