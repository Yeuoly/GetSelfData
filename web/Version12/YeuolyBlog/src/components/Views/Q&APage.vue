<template>
    <div class="QA-page yb-icon-font">
        <div class="title-h">
            <common-title class-name="title" size="h2">
                <i>&#xe62a;</i>这里是对常见问题的解答
            </common-title>
        </div>
        <div class="qa-h">
            <QA v-for="t in collection">
                <span slot="Q">{{t.q}}</span>
                <span slot="A">{{t.a}}</span>
            </QA>
        </div>
    </div>
</template>

<script>
    import QA from '../Common/QA'
    import CommonTitle from "../Common/CommonTitle";

    export default {
        name: "QAPage",
        components: {CommonTitle, QA },
        data(){
            return {
                collection : [
                    {
                        q : 'YeuolyBlog是干啥的？',
                        a : '其实就是个记事本，虽说是博客，但暂时还没完成该有的主页自定义等功能。'
                    },
                    {
                        q : 'YeuolyBlog是谁做的？',
                        a : '是Yeuoly做哒！'
                    },
                    {
                        q : 'YeuolyBlog怎么用？',
                        a : 'Yeuoly将所有主要功能都放到了左边的菜单栏，左上角有个按钮能打开菜单，' +
                            '然后看字面意思应该就能知道了。'
                    },
                    {
                        q : '为什么要做这个破东西？',
                        a : '一方面，这是Yeuoly的第一个web应用（练手），然后Yeuoly一直都想做' +
                            '这么一个东西来写日记，然后一不小心就做这么大了orz。'
                    },
                    {
                        q : '为啥我改了名之后我以前发的博客的作者名字没改？',
                        a : '每一个脚印都是自己踩下的，也许您不喜欢自己的过去，但那终究是一段回忆。'
                    },
                    {
                        q : '关于里提到的DataConnection是个啥？',
                        a : 'YeuolyBlog终究是一个初级阶段，而DataConnection将会是它的第二形态' +
                            '，但那大概是很多年以后的事情了，毕竟Yeuoly才高中呐。'
                    },
                    {
                        q : 'Yeuoly高中怎么还有时间做这个？',
                        a : '对不同的人来说有不同的爱好，一昧的学习效率并不高，有的人通过运动来放松自己，' +
                            '而Yeuoly就通过写代码来放松自己。'
                    },
                    {
                        q : '怎么联系Yeuoly？',
                        a : '微博搜索Yeuoly芸璃，推特搜索@Yeuoly1，发送邮件到admin@srmxy.cn'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    i{
        padding-right: 10px;
        font-style: normal;
    }

    .title-h{
        border-bottom: rgba(0,0,0,.2) solid 2px;
    }

    .title{
        color: rgb(21,101,192);
    }

    .qa-h{
        overflow: auto;
        padding-top: 20px;
    }

    .QA-page{
        width: 45%;
        margin: 20px auto;
        padding: 30px;
        box-shadow: rgba(0,0,0,.2) 1px 1px 1px;
    }

    @media (max-width: 650px) {
        .QA-page{
            width: calc(100% - 60px);
        }
    }
</style>