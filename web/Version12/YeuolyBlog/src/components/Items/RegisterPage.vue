<template>
    <div id="register-page">
        <Title title="&#xe71c; 注册" />
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
            <repeatPassword
                    placeholder="重复密码"
                    type="password"
                    @VKeyup="verifyFormat('repeatPassword')"
                    v-model="repeat_password"
                    :tip="repeat_password_tip"
                    ID="input-RePassword"
            />
            <Email
                    placeholder="邮箱"
                    type="text"
                    @VKeyup="verifyFormat('email')"
                    v-model="email"
                    :tip="email_tip"
                    ID="input-Email"
            />
            <NormalCaptcha
                    placeholder="验证码"
                    type="text"
                    @VKeyup="verifyFormat('normalCaptcha')"
                    v-model="normal_captcha"
                    :tip="normal_captcha_tip"
                    ID="input-NormalCaptcha"
            />
            <EmailCaptcha
                    placeholder="邮箱二次验证码"
                    type="text"
                    @VKeyup="verifyFormat('emailCaptcha')"
                    v-model="email_captcha"
                    :tip="email_captcha_tip"
                    ID="input-EmailCaptcha"
            />
        </div>
        <div class="btn-group">
            <LoginBtn
                    @VClick="login"
                    :enable="true"
                    content="&#xe600; 登录"
                    class-name="login-btn yb-icon-font"
            />
            <RegisterBtn
                    @VClick="register"
                    :enable="allowedRegister"
                    content="&#xe71c; 注册"
                    class-name="register-btn yb-icon-font"
            />
        </div>
    </div>
</template>

<script>

    import CommonButton from '../Common/CommonButton';
    import PassportInput from '../Common/PassportInput';
    import Title from '../Common/PassportTitle';

    export default {
        name: "RegisterPage",
        components : {
            Title : Title,
            Account : PassportInput,
            Password : PassportInput,
            repeatPassword : PassportInput,
            Email : PassportInput,
            NormalCaptcha : PassportInput,
            EmailCaptcha : PassportInput,
            RegisterBtn : CommonButton,
            LoginBtn : CommonButton
        },
        data () {
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
        computed : {
            allowedRegister() {
                return this.format_allowed_account && this.format_allowed_password &&
                    this.format_allowed_repeat_password && this.format_allowed_email
            }
        },
        methods : {
            verifyFormat(method){
                switch (method) {
                    case 'account':
                        break;
                    case 'password':
                        break;
                    case 'repeatPassword':
                        break;
                    case 'email':
                        break;
                    case 'normalCaptcha':
                        break;
                    case 'emailCaptcha':
                        break;
                }
            },
            login () {
                this.$router.push({ name : 'login' });
            },
            register () {

            }
        }
    }
</script>

<style scoped>

    .btn-group{
        min-height: 30px;
        width: 80%;
        margin: 0 auto;
        position: relative;
    }

    .login-btn{
        position: absolute;
        left: calc((100% / 2) + 10px);
    }

    .register-btn{
        position: absolute;
        right: calc((100% / 2) + 10px);
    }
</style>