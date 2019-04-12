<template>
    <div>
        <p style="margin: 0" v-for="t in content">
            {{t}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "CommonTextArea",
        props : {
            src : String,
        },
        computed : {
            content(){
                if(typeof this.src !== 'string')
                    return [];
                return this.src.split(/[\n\r]/g);
            }
        }
    }
</script>