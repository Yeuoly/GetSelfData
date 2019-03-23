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
            >
            </div>
        </div>
    </div>
</template>

<script>
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
        }
    }
</script>

<style scoped>
    .normal-input{
        border: 2px;
    }

    .input{
        width: 100%;
        min-height:20px;
        outline: 0;
        font-size: 13px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-user-modify: read-write-plaintext-only;
    }

    [contenteditable=true]:empty:not(:focus):before{
        content: attr(placeholder);
        color: #a99f9f;
    }

</style>