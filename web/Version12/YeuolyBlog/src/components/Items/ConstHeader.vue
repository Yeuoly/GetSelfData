<template>
    <div class="header" id="header">
        <div style="padding: 3px;float: left;">
            <div class="btn-click" @click="openSideMenu">
                <i class="yb-icon-font" style="font-size: 25px">&#xe65c;</i>
            </div>
        </div>
        <ul id="" v-for="dep in headerFunctionList" :key="dep.className">
            <li class="btn-click">
                <div v-html="dep.innerHtml"
                     :class="dep.className"
                     @click="dep.click"
                     :id="dep.id"
                >
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
        vertical-align: middle;
    }

    .btn-click{
        border-radius: 50%;
        background-color: transparent;
        width: 39px;
        height: 39px;
        line-height: 39px;
        font-size: 25px;
        cursor: pointer;
        color: white;
        text-align: center;
        vertical-align: middle;
    }

    .btn-click:hover{
        background-color: #537383;
    }


</style>