<template>
    <div class="card yb-icon-font" id="about">
        <common-title-h3 :id="'about-title'" class-name="card-title">
            {{title}}
        </common-title-h3>
        <div id="about-content" class="card-content">
            <div id="head">
                {{content}}
            </div>
            <div id="techList">
                <ul>
                    <li v-for="T in techList" class="tech-list-li">
                        <div class="techAbout">
                            <div class="techName">
                                <span v-html="T.name"></span>
                                &#xe648;
                            </div>
                            <span class="techContent">
                                {{T.content}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { techList } from "../../js/module-beta"
    import { normalIntroduction } from "../../js/module-beta"

    import CommonTitleH3 from '../Common/CommonTitle'

    export default {
        name : 'AboutList',
        components: {CommonTitleH3},
        data : () => {
            return {
                title : '关于本站',
                content : normalIntroduction,
                techList : techList
            }
        }
    }
</script>

<style scoped>

    .card{
        -webkit-text-stroke-width: 0;
        word-break: break-word;
    }

    .techAbout{
        padding: 0;
        margin: 0;
        border: 0;
    }

    .techName{
        float: left;
        font-size: 16px;
    }

    .techContent{
        font-size: 13px;
        padding-left: 1px;
    }

    .tech-list-li{
        line-height: 25px;
        list-style: none;
    }

</style>