<template>
    <div class="picture-input">
        <img :class="'img ' + ( imageClass ? imageClass : '' )"
             :src="imageValue"
             alt=""
        >
        <input type="text"
               placeholder="填写图片链接地址"
               :value="hostValue"
               :id=id
               :class="'input '+( inputClass ? inputClass : '' )"
               @blur="handleBlur"
        >
    </div>
</template>

<script>
    export default {
        name: "PictureInput",
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            placeholder : String,
            id : String,
            imageClass : String,
            inputClass : String,
            hostValue : String,
        },
        data () {
            return {
                imageValue : ''
            }
        },
        methods : {
            handleBlur (e) {
                this.$emit('change',e.target.value);
                this.imageValue = e.target.value;
            }
        }
    }
</script>

<style scoped>
    .picture-input input{
        border: 0;
        background-color: transparent;
        outline: none;
        font-size: 16px;
        font-family: "Libre Franklin", "Helvetica Neue", helvetica, arial, sans-serif;
    }

    ::placeholder{
        color: #a99f9f;
    }
</style>