<template>
    <span>
        {{ src ? src : ''}}
    </span>
</template>

<script>
    export default {
        name: "CommonTextArea",
        props : {
            src : String,
        }
    }
</script>