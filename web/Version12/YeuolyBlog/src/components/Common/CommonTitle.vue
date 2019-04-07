<template>
    <h1 v-if="size === 'h1'" :id="id" :class="className">
        <slot></slot>
    </h1>
    <h2 v-else-if="size === 'h2'" :id="id" :class="className">
        <slot></slot>
    </h2>
    <h4 v-else-if="size === 'h2'" :id="id" :class="className">
        <slot></slot>
    </h4>
    <h5 v-else-if="size === 'h2'" :id="id" :class="className">
        <slot></slot>
    </h5>
    <h6 v-else-if="size === 'h2'" :id="id" :class="className">
        <slot></slot>
    </h6>
    <h3 v-else :id="id" :class="className">
        <slot></slot>
    </h3>
</template>

<script>
    export default {
        name: "CommonTitleH3",
        props : {
            id : String,
            className : String,
            size : String
        }
    }
</script>

<style scoped>

</style>