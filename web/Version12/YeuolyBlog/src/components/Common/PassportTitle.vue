<template>
    <div class="title yb-icon-font">
        <div v-html="title"></div>
    </div>
</template>

<script>
    export default {
        name: "PasswordTitle",
        props : {
            title : String
        }
    }
</script>

<style scoped>
    .title{
        margin: 0 auto;
        height: 56px;
        line-height: 56px;
        text-align: center;
        padding: 0 20px;
        font-size: 40px;
        background: transparent;
        color: rgba(44,62,80,0.6);
        padding-bottom: 30px;
    }
</style>