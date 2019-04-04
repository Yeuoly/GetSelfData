<template>
    <div class="table-editor">
        <common-table :src="hostValue" />
        <common-input v-model="directionBuff" v-on:keydown.native.enter="updateTable"/>
    </div>
</template>

<script>

    import CommonInput from '../Common/NormalInput'
    import CommonTable from '../Common/CommonTable'

    export default {
        name: "TableInput",
        components : {
            CommonTable,
            CommonInput
        },
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            hostValue : Object
        },
        methods : {
            handleChange() {
                this.$emit('change',this.hostValue);
            },
            updateTable() {
                console.log(this.directionBuff);
            }
        },
        data () {
            return {
                directionBuff : ''
            }
        }
    }
</script>

<style scoped>

</style>