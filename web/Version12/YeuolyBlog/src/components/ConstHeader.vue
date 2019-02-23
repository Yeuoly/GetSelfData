<template>
    <div class="header" id="header">
        <div class="user-block-open header-function-list-dep" id="user-block-open">
            <div class="user-block-open-click" id="user-block-open-click" @click="openSideMenu">
                ≡≡
            </div>
        </div>

        <ul id="header-function-list" v-for="dep in headerFunctionList" :key="dep.className">
            <li class="header-function-list">
                <div class="header-function-list-dep">
                    <div class="header-function-list-depInner">
                        <div
                             v-html="dep.innerHtml"
                             :class="dep.className"
                             @click="dep.click"
                             :id="dep.id"
                        >
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

    import { GlobalCommunication } from '../js/GlobalCommunication';

    export default {
        name : 'ConstHeader',
        data : () => {
            return {
                headerFunctionList : [

                ]
            }
        },
        methods : {
            //打开右边侧栏菜单
            openSideMenu : () =>{
                GlobalCommunication.$emit('openBlackCover');
                GlobalCommunication.$emit('openSideMenu');
                GlobalCommunication.$emit('bindClickBlackCover',()=>{
                    GlobalCommunication.$emit('closeBlackCover');
                    GlobalCommunication.$emit('closeSideMenu');
                });
            },
        }
    }
</script>

<style>
    .header{
        box-shadow: 3px 3px 2px #a99f9f;
        opacity: 0.7;
        width: 100%;
        height: 45px;
        padding-left: 5px;
        border: 0;
        background-color: #fb8d8d;
        background-attachment:fixed;
        margin-left: -5px;
    }

    .header-statue{
        height: 100%;
        width: 50%;
        font-size: 150%;
        font-family: "微软雅黑";
        color: white;
        float: left;
        vertical-align: middle;
    }

    .header-passport{
        width: 20%;
        font-family: "微软雅黑";
        height: 100%;
        vertical-align: middle;
        float: right;
        margin: 0;
        padding: 0;
        border: 0;
        text-align: right;
    }

    .header-passport #passport{
        width: 80%;
        height: 100%;
        border: 0px;
        color: white;
        font-size: 130%;
        background: transparent;
        vertical-align: middle;
        margin: 0 auto;
    }

    .header-passport #passport:hover{
        cursor: pointer;
    }
</style>