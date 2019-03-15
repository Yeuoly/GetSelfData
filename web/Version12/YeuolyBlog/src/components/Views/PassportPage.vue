<template>
    <div id="passport">
        <div id="passport-item-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        name : 'PassportPage',
        data () {
            return {

            }
        }
    }

</script>

<style scoped>

    #passport-item-container{
        overflow: auto;
        width: 40%;
        margin: auto;
        background: rgba(244,244,244,0.3);
        padding-top: 30px;
        margin-top: 60px;
        border-radius: 8px;
        min-height: 70vh;
    }

</style>