<template>
    <div class="setting">
        <div class="side-bar yb-icon-font">
            <side-tool-bar>
                <div @click="dealSettingSwitch('setting-user-base')">
                    <i>&#xe60d;</i><span>常规</span>
                </div>
                <div @click="dealSettingSwitch('setting-user-advance')">
                    <i>&#xe677;</i><span>高级</span>
                </div>
            </side-tool-bar>
        </div>
        <div class="function">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import SideToolBar from '../Common/SideToolBar';

    export default {
        name: "SettingPage",
        components : { SideToolBar },
        mounted() {
            if(this.$route.name === 'setting'){
                this.$router.push({name : 'setting-user-base'});
            }
        },
        methods : {
            dealSettingSwitch(dest){
                this.$router.push({ name : dest });
            }
        }
    }
</script>

<style scoped>

    i{
        padding-right: 10px;
        font-style: normal;
    }

    .setting{
        overflow: auto;
        width: 80%;
        margin: 0 auto;
        margin-top: 30px;
        border-radius: 3px;
        border: rgba(0,0,0,.2) solid 1px;
    }

    .side-bar{
        width: 150px;
        float: left;
        margin-left: -1px;
        margin-top: -1px;
    }

    .function{
        float: left;
        width: calc(100% - 151px);
        border-left: rgb(204,204,204) solid 1px;
        margin-left: -1px;
    }

    @media (max-width: 462px) {
        .side-bar{
            width: 100px;
        }

        .function{
            width: calc(100% - 101px);
        }
    }

</style>