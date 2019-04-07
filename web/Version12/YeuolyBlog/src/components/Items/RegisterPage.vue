<template>
    <div id="register-page">
        <Title title="&#xe71c; 注册" />
        <form class="input-group">
            <div style="width: 80%;margin: 0 auto">
                <Account
                        placeholder="账号"
                        type="text"
                        @VKeyup="formatChecker('account')"
                        v-model.lazy="account"
                        :tip="account_tip"
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
                <repeatPassword
                        placeholder="重复密码"
                        type="password"
                        @VKeyup="formatChecker('repeatPassword')"
                        v-model="repeat_password"
                        :tip="repeat_password_tip"
                        ID="input-RePassword"
                />
                <Email
                        placeholder="邮箱"
                        type="text"
                        @VKeyup="formatChecker('email')"
                        v-model="email"
                        :tip="email_tip"
                        ID="input-Email"
                />
                <NormalCaptcha
                        placeholder="验证码"
                        type="text"
                        @VKeyup="formatChecker('normalCaptcha')"
                        v-model="normal_captcha"
                        :tip="getNormalCaptcha"
                        ID="input-NormalCaptcha"
                />
                <EmailCaptcha
                        placeholder="邮箱二次验证码"
                        type="text"
                        @VKeyup="formatChecker('emailCaptcha')"
                        v-model="email_captcha"
                        :tip="email_captcha_tip"
                        ID="input-EmailCaptcha"
                />
            </div>
        </form>
        <div class="btn-group">
            <RegisterBtn
                    @VClick="register"
                    :enable="allowedRegister"
                    content="&#xe71c; 注册"
                    class-name="register-btn flex-cell yb-icon-font"
            />
            <NormalCaptchaBtn
                    @VClick="getEmailCaptcha"
                    :enable="allowGetNormalCaptcha"
                    content="&#xe636; 发送验证码"
                    class-name="captcha-btn flex-cell yb-icon-font"
            />
            <LoginBtn
                    @VClick="login"
                    :enable="true"
                    content="&#xe600; 登录"
                    class-name="login-btn flex-cell yb-icon-font"
            />
        </div>
    </div>
</template>

<script>

    import CommonButton from '../Common/CommonButton'
    import TipInput from '../Common/TipInput'
    import Title from '../Common/PassportTitle'
    import { GlobalCommunication } from "../../js/GlobalCommunication"
    import { InfoModule } from "../../js/module-alpha"
    import { AccountFormatChecker } from "../../mixins/AccountFormatChecker"

    export default {
        name: "RegisterPage",
        components : {
            Title : Title,
            Account : TipInput,
            Password : TipInput,
            repeatPassword : TipInput,
            Email : TipInput,
            NormalCaptcha : TipInput,
            EmailCaptcha : TipInput,
            RegisterBtn : CommonButton,
            LoginBtn : CommonButton,
            NormalCaptchaBtn : CommonButton
        },
        data () {
            return {
                querying : false
            }
        },
        computed : {
            allowCommon () {
                return this.format_allowed_account && this.format_allowed_password &&
                this.format_allowed_repeat_password && this.format_allowed_email;
            },
            allowedRegister() {
                return this.allowCommon && this.normal_captcha !== '' && this.email_captcha !== '';
            },
            allowGetNormalCaptcha() {
                return this.allowCommon && this.normal_captcha !== '';
            },
            getNormalCaptcha () {
                return '<img ' +
                    'alt="error" ' +
                    'src="'+ InfoModule.getUrlPath('Captcha.php?method=register',InfoModule.dir_api) +'"' +
                    'style="height: 25px;padding-bottom: 5px"' +
                    '>';
            },
        },
        methods : {
            login () {
                this.$router.push({ name : 'login' });
            },
            register () {
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('account/v1/Register.php',InfoModule.dir_api),
                    {
                        act : this.account,
                        pswd : this.password,
                        captcha : this.email_captcha
                    },
                    (data) => {
                        if(data.data['res'] === InfoModule.response.requestSuccess)
                        {
                            this.$utils.messageBox('注册成功~');
                            setTimeout(() => {
                                document.location = InfoModule.getUrlPath('#/passport/login',InfoModule.dir_web);
                            }, 1000);
                        }else{
                            this.$utils.messageBox(data.data['error'],'warn');
                        }
                    }
                );
            },
            getEmailCaptcha () {
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('Verification.php',InfoModule.dir_api),
                    {
                        email : this.email,
                        method : 'register',
                        captcha : this.normal_captcha
                    },
                    (data) => {
                        if(data.data['res'] === InfoModule.response.requestSuccess)
                        {
                            this.$utils.messageBox('验证码已发送');
                        }else{
                            this.$utils.messageBox(data.data['error'],'warn');
                        }
                    },
                    () => {
                        this.$utils.messageBox('发送了意外的错误','warn');
                    }
                );
            }
        },
        mixins : [AccountFormatChecker]
    }
</script>

<style scoped>

    .btn-group{
        min-height: 30px;
        width: 80%;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: row ;
        flex-wrap: nowrap;
    }

    .login-btn{

    }

    .register-btn{

    }

    .captcha-btn{

    }

    .flex-cell{
        flex: 1;
        width: 20%;
    }
</style>