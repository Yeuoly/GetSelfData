<template>
    <div class="QA">
        <div class="Q">
            <slot name="Q"></slot>
        </div>
        <div class="A">
            <slot name="A"></slot>
        </div>
        <div class="vertical-blank-block"></div>
    </div>
</template>

<script>
    export default {
        name: "QA"
    }
</script>

<style scoped>
    .QA{
        overflow: auto;
    }

    .Q{
        overflow: auto;
        color: rgb(21,101,192);
        font-size: 16px;
        font-weight: 500;
    }

    .A{
        overflow: auto;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,0,0,.87)
    }
</style>