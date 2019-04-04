<template>
    <span :class="className ? className : ''">
        {{ src ? src : ''}}
    </span>
</template>

<script>
    export default {
        name: "CommonTextArea",
        props : {
            src : String,
            className : String
        }
    }
</script>

<style scoped>

</style>