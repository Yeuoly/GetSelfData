<template>
    <div class="footer" id="footer"><strong>{{copyright}}</strong></div>
</template>

<script>
    import { InfoModule } from "../../js/module-alpha";

    export default {
        name : 'ConstFooter',
        data () {
            return {
                copyright : InfoModule.others.copyright
            }
        }
    }
</script>

<style scoped>
    .footer{
        overflow: auto;
        width: 100%;
        height: 25px;
        text-align: center;
        color: rgba(15,15,15,.85);
        background-color: transparent;
        line-height: 1.5;
        font-size: 12px;
    }
</style>