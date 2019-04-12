<template>
    <div id="updates-log" class="card yb-icon-font">
        <common-title-h3 :id="'log-title'" class-name="card-title">
            {{title}}
        </common-title-h3>
        <div id="updates-log-list">
            <ul>
                <li v-for="log in updateLog">
                    <div class="updateLog">
                        <div class="controller-1">
                            <span class="title">{{log.title}}</span>
                            <span class="version font--small">ver-{{log.version}}</span>
                        </div>
                        <p class="date">{{log.date}}</p>
                        <span class="content font--small"> {{log.content}}</span>
                    </div>
                    <div class="vertical-blank-block"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { updateLog } from "../../js/module-beta";
    import CommonTitleH3 from "../Common/CommonTitle";

    export default {
        name : 'IndexUpdateLog',
        components: {CommonTitleH3},
        props : {

        },
        data : () => {
            return {
                title : '网站更新日志',
                updateLog : updateLog
            }
        }
    }
</script>

<style scoped>
    #updates-log-list li{
        list-style: none;
    }

    .card{
        -webkit-text-stroke-width: 0;
    }

    .updateLog{
        width: 100%;
        overflow: auto;
        margin: 0 auto;
    }

    .title{
        margin: 0;
        font-size: 15px;
        font-weight: 600;
    }

    .date{
        margin: 0;
        font-size: 13px
    }

    .version{
        background-color: #616161!important;
        color: white;
        padding: 5px;
        margin-left: 5px;
        border-radius: 3px;
    }

    .controller-1{
        overflow: hidden;
    }

    .content{
        float: left;
        width: 90%;
    }

    .updateLog-blank-block{
        width: 100%;
        height: 8px;
        padding: 0;
        margin: 0;
        border: 0;
    }
</style>