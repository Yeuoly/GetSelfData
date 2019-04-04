<template>
    <div class="url">
        <a :href="src.url" class="url">
            {{ src.text }}
        </a>
    </div>
</template>

<script>
    export default {
        name: "CommonUrlLink",
        props : {
            src : Object
        }
    }
</script>

<style scoped>
    .url {
        font-size: 135%;
        color: black;
    }

    .url td{
        display: table-cell;
        text-align: center;
        color:rgb(37, 37, 37);
    }
</style>