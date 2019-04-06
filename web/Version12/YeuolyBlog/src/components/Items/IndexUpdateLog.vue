<template>
    <div id="updates-log" class="card yb-icon-font">
        <h3 id="log-title" class="card-title">
            {{title}}
        </h3>
        <div id="updates-log-list">
            <ul>
                <li v-for="log in updateLog">
                    <div class="updateLog">
                        <span class="updateLog-title">{{log.date}} &#xe648; {{log.title}}</span>
                        <span class="updateLog-blank-block"></span>
                        <span class="updateLog-content"> &#xe648; {{log.content}}</span>
                    </div>
                    <div class="vertical-blank-block"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { updateLog } from "../../js/module-beta";

    export default {
        name : 'IndexUpdateLog',
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

    .updateLog-title{
        font-size: 16px;
        width: 90%;
    }

    .updateLog-content{
        float: left;
        font-size: 14px;
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