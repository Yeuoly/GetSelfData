<template>
    <div id="register-page">
        <Title title="&#xe71c; 注册" />
        <form class="input-group">
            <Account
                    placeholder="账号"
                    type="text"
                    @VKeyup="verifyFormat('account')"
                    v-model.lazy="account"
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
                    :tip="getNormalCaptcha"
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

    import CommonButton from '../Common/CommonButton';
    import PassportInput from '../Common/PassportInput';
    import Title from '../Common/PassportTitle';
    import { Pattern } from "../../js/GlobalUtils";
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { InfoModule } from "../../js/module";

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
            LoginBtn : CommonButton,
            NormalCaptchaBtn : CommonButton
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
            verifyFormat(method){
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
                                        InfoModule.getUrlPath('FindUser.php',InfoModule.dir_api),
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
            login () {
                this.$router.push({ name : 'login' });
            },
            register () {
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('Register.php',InfoModule.dir_api),
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
        }
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