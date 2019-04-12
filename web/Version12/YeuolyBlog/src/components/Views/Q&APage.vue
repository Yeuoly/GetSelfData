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
    import CommonTitle from "../Common/CommonTitle"
    import { FQACollection } from "../../js/module-beta"

    export default {
        name: "QAPage",
        components: {CommonTitle, QA },
        data(){
            return {
                collection : FQACollection
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