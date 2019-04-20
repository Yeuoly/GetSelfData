<template>
    <div class="footer font--small-ex text--grey" id="footer"><strong>{{copyright}}</strong></div>
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
        width: 100%;
        height: 25px;
        text-align: center;
        line-height: 1.5;
        position: absolute;

    }
</style>