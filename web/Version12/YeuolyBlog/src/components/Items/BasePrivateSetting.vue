<template>
    <div class="private-setting">
        <div class="holder">
            <div class="editor">
                <div class="label">
                    <span>账号：</span>
                </div>
                <div class="input">
                    <tip-input placeholder="账号" tip="" v-model="account"/>
                </div>
                <div class="btn-s">
                    <common-button
                            @VClick="formatChecker"
                            :enable="true"
                            content="修改账号"
                    />
                </div>
            </div>
            <div class="editor">
                <div class="label">
                    <span>密码：</span>
                </div>
                <div class="input">
                    <tip-input placeholder="原密码" tip=""/>
                </div>
                <div class="label">
                    <span>新密码：</span>
                </div>
                <div class="input">
                    <tip-input placeholder="原密码" tip=""/>
                </div>
                <div class="label">
                    <span>重复新密码：</span>
                </div>
                <div class="input">
                    <tip-input placeholder="重复新密码" tip=""/>
                </div>
                <div class="btn-s">
                    <common-button
                            @VClick="formatChecker"
                            :enable="true"
                            content="修改密码"
                    />
                </div>
            </div>
            <div class="editor">
                <div class="label">
                    <span>邮箱：</span>
                </div>
                <div class="input">
                    <tip-input placeholder="邮箱" tip="" v-model="email"/>
                </div>
                <div class="btn-s">
                    <common-button
                            @VClick="formatChecker"
                            :enable="true"
                            content="修改邮箱"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TipInput from '../Common/TipInput'
    import CommonButton from '../Common/CommonButton'

    import { GlobalCommunication } from "../../js/GlobalCommunication"
    import { InfoModule } from "../../js/module-alpha"
    import { Pattern } from "../../js/GlobalUtils"

    export default {
        name: "BasePrivateSetting",
        components : {
            TipInput,
            CommonButton
        },
        data(){
            return {
                account : '',
                email : '',
                password : '',
                repeatPassword: ''
            }
        },
        methods : {
            formatChecker(){
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
            },
            loadInfo(){
                let store = this.$store.getters.userInfo;
                this.account = store['user_id'];
                this.email = store['user_email'];
            }
        }
    }
</script>

<style scoped>
    .private-setting{
        min-height: 300px;
        padding-top: 30px;
    }

    .holder{
        width: 90%;
        margin: 0 auto;
    }

    .editor{
        width: 90%;
        padding-bottom: 30px;
    }

    .label {
        height: 40px;
        line-height: 40px;
        text-align: right;
        float: left;
        width: 15%;
    }

    .input{
        overflow: auto;
        width: 85%;
    }

    .btn-s{
        margin-top: -5px;
    }
</style>