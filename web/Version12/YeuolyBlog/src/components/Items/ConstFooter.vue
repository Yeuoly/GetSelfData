<template>
    <div class="footer" id="footer">{{copyright}}</div>
</template>

<script>
    import { BaseModule } from "../../js/module";

    export default {
        name : 'ConstFooter',
        data () {
            return {
                copyright : BaseModule.BaseInfo.m_COPYRIGHT
            }
        }
    }
</script>

<style scoped>
    .footer{
        width: 100%;
        height: 25px;
        text-align: center;
        color: white;
        background-color: transparent;
    }
</style>