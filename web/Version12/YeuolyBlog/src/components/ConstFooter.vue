<template>
    <div class="footer" id="footer">{{copyright}}</div>
</template>

<script>
    import { BaseModule } from "../js/module";

    export default {
        name : 'ConstFooter',
        data () {
            return {
                copyright : BaseModule.baseinfo.m_COPYRIGHT
            }
        }
    }
</script>

<style>
    .footer{
        width: 100%;
        height: 25px;
        text-align: center;
        color: white;
        background-color: rgb(255, 196, 196);
    }
</style>