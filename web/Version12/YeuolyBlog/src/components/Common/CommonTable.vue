<template>
    <table class="table">
        <tr v-for="t in src">
            <td v-for="(value,key) in t" :tdKey="key">
                {{ value }}
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "CommonTable",
        props : {
            src : Object
        },
        methods : {

        }
    }
</script>

<style scoped>
    .table{
        width: 90%;
        margin: 0 auto;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>