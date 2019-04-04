<template>
    <div class="normal-picture-holder">
        <img class="img" :src="src ? src : ''" alt="/">
    </div>
</template>

<script>
    export default {
        name: "CommonPictureHolder",
        props : {
            src : String
        }
    }
</script>

<style scoped>
    .img{
        width: 100%;
    }
</style>