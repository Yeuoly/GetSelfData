<template>
    <div :class="'normal-input ' + (className ? className : '')"
         :id="idName ? idName : ''"
    >
        <div class="normal-input-holder">
            <div class="input"
                 contenteditable="true"
                 :innerHTML="hostValue"
                 :placeholder="placeholder"
                 @keyup="handleInput"
                 @keydown.enter="handleEnter"
                 v-on="inputListeners"
                 ref="editor"
            ></div>
        </div>
    </div>
</template>

<script>
    let loaded = false;

    export default {
        name: "NormalInput",
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            hostValue : String,
            className : String,
            placeholder :String,
            idName : String,
            disableBreakWord : Boolean
        },
        methods : {
            handleInput (e) {
                this.$emit('change',e.target.innerHTML);
            },
            handleEnter (e) {
                this.$emit('VKeydown-Enter');
                if(this.disableBreakWord === true)
                {
                    e.preventDefault();
                }
            }
        },
        computed : {
            inputListeners(){
                let vm = this;
                return Object.assign({},
                    vm.$listeners,
                );
            }
        },
        watch : {
            hostValue(){
                if(!loaded) {
                    setTimeout(() => {
                        this.$refs.editor.innerHTML = this.hostValue;
                        loaded = true;
                    },0);
                }
            }
        }
    }
</script>

<style scoped>
    .normal-input{
        border: 2px;
    }

    .input{
        cursor: text;
        width: 100%;
        min-height:20px;
        outline: 0;
        font-size: 16px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-user-modify: read-write-plaintext-only;
        font-family: "Libre Franklin", "Helvetica Neue", helvetica, arial, sans-serif;
    }

    [contenteditable=true]:empty:not(:focus):before{
        content: attr(placeholder);
        color: #a99f9f;
    }

</style>