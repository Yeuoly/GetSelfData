<template>
    <div class="privacy-setting">
        <div class="item">
            <div class="holder" v-for="t in collection">
                <div class="dep">
                    <div class="label font--normal">
                        <span>{{t.title}}</span>
                    </div>
                    <switch-button v-model="t.enable" />
                </div>
                <span class="font--small-ex text--grey">{{t.about}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchButton from "../Common/SwitchButton";
    export default {
        name: "PrivacyPrivateSetting",
        components: {SwitchButton},
        data(){
            return{
                test : false,
                a : false,
                b : false,
                collection : {
                    visitAble: {
                        title: '我可以被看到吗？',
                        about: '他人在搜索或者访问他人空间时是否能找到我',
                        enable: true
                    },
                    followAble: {
                        title: '我可以被关注嘛？',
                        about: '他人能否可以实时跟踪获取我的博客',
                        enable: true
                    }
                    ,
                    commentAble: {
                        title: '我的博客可以被评论嘛？',
                        about: '他人是否可以在我的博客下评论',
                        enable: false
                    }
                    ,
                    likeAble: {
                        title: '我的博客可以被点赞嘛？',
                        about: '他人是否可以对我的博客点赞',
                        enable: true
                    }
                    ,
                    reportAble: {
                        title: '我的博客可以被转发嘛？',
                        about: '他人是否可以转发我的博客',
                        enable: true
                    }
                    ,
                    chatAble: {
                        title : '陌生人可以联系我嘛？',
                        about: '不是我关注的人是否可以向我发起私信',
                        enable: false
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .privacy-setting{
        min-height: 300px;
        padding-top: 20px;
    }

    .privacy-setting .item{
        padding: 10px;
        width: 90%;
    }

    .privacy-setting .dep{
        overflow: hidden;
    }

    .privacy-setting .holder{
        padding-bottom: 20px;
    }

    .privacy-setting .label {
        float: left;
        line-height: 28px;
        height: 28px;
    }

</style>