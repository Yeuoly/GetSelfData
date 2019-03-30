<template>
    <div class="url-input">
        <common-editor
                v-model="hostValue.text"
                :disable-break-word="true"
                placeholder="链接文本"
                class-name="dep"
        />
        <common-editor
                v-model="hostValue.url"
                :disable-break-word="true"
                placeholder="链接地址"
                class-name="dep"
        />
    </div>
</template>

<script>

    import CommonEditor from '../Common/NormalInput'

    export default {
        name: "UrlInput",
        components : {
            CommonEditor
        },
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            hostValue : Object
        },
        methods : {
            handleChange () {
                this.$emit('change',this.hostValue);
            }
        },
        watch : {
            hostValue : {
                handler () {
                    this.handleChange();
                },
                immediate : false,
                deep : true
            }
        }
    }
</script>

<style scoped>

    .url-input{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border: 0;
        background-color: transparent;
        text-decoration: none;
        font-size: 16px;
        font-family: "Libre Franklin", "Helvetica Neue", helvetica, arial, sans-serif;
    }

    .dep{
        flex: 1;
        width: 50%;
        padding-right: 5px;
    }

</style>