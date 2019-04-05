<template>
    <div class="header" id="header">
        <div class="user-block-open header-function-list-dep" id="user-block-open">
            <div class="user-block-open-click" id="user-block-open-click" @click="openSideMenu">
                <i class="yb-icon-font" style="font-size: 25px">&#xe65c;</i>
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

    import { GlobalCommunication } from '../../js/GlobalCommunication';

    export default {
        name : 'ConstHeader',
        data : () => {
            return {
                headerFunctionList : []
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
        box-shadow: 2px 1px 1px #a99f9f;
        opacity: 0.7;
        width: 100%;
        height: 45px;
        padding-left: 5px;
        border: 0;
        background-color: #607d8b;
        background-attachment:fixed;
        margin-left: -5px;
    }

    #user-block-open-click{
        border-radius: 50%;
        background-color: transparent;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 25px;
        text-align: center;
        vertical-align: middle;
        color: white;
    }

    #user-block-open-click:hover , .header-function-list-depInner:hover{
        background-color: #597b8b;
    }


</style>