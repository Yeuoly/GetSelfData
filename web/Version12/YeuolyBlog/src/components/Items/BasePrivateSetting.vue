<template>
    <div class="private-setting">
        <div class="holder">
            <div class="editor">
                <div class="label">
                    <span>昵称：</span>
                </div>
                <div class="input">
                    <tip-input
                            placeholder="昵称"
                            :tip="account_tip"
                            v-model="account"
                            @VKeyup="formatChecker('account')"
                    />
                </div>
                <div class="btn-s">
                    <common-button
                            @VClick="modifyInfo('id',account)"
                            :enable="true"
                            content="修改昵称"
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
                    <tip-input placeholder="新密码" tip=""/>
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
                            :enable="false"
                            content="修改密码（暂不支持）"
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
                            :enable="false"
                            content="修改邮箱（暂不支持）"
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
    import { AccountFormatChecker } from "../../mixins/AccountFormatChecker"

    export default {
        name: "BasePrivateSetting",
        components : {
            TipInput,
            CommonButton
        },
        data(){
            return {
                origin_account : String,
                origin_email : String,
            }
        },
        methods : {
            loadInfo(){
                let store = this.$store.getters.userInfo;
                this.account = store['user_id'];
                this.email = store['user_email'];
                this.origin_account = this.account;
                this.origin_email = this.email;
            },
            modifyInfo(dest,modified,origin){
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('account/v2/SetUserMeta.php',InfoModule.dir_api),
                    {
                        dest : dest,
                        ogv : origin,
                        myv : modified
                    },
                    (data) => {
                        if(data.data['res'] !== InfoModule.response.requestSuccess)
                        {
                            this.$utils.messageBox(data.data['error'],'warn');
                        }else{
                            this.$utils.messageBox('修改成功');
                            GlobalCommunication.$emit('refreshUserData');
                        }
                    }
                );
            }
        },
        mixins : [AccountFormatChecker],
        created() {
            this.loadInfo();
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
    
    @media (max-width: 1178px) {
        .label{
            font-size: 14px;
        }
    }

    @media (max-width: 1058px) {
        .label{
            font-size: 13px;
        }
    }

    @media (max-width: 994px) {
        .label{
            font-size: 12px;
        }
    }

    @media (max-width: 930px) {
        .label{
            text-align: left;
            font-size: 16px;
            float: none;
            width: 90%;
            margin: 0 auto;
        }

        .input{
            width: 100%;
        }
    }
</style>