<template>
    <div class="wrap" id="includes">
        <ul class="post-card-ul">
            <li class="post-card-li" v-for="ev in postDepartment">
                <div class="vertical-blank-block"></div>
                <div class="post-card">
                    <div class="post-card-head">
                        <h3 class="post-title">
                            {{ev.title}}
                        </h3>
                        <div class="post-card-userblock">
                            <div class="post-card-userblock-avatar">
                            </div>
                            <div class="post-card-userblock-id">
                                {{ev.user}}
                            </div>
                        </div>
                        <div class="post-introduction">
                            {{ev.introduction}}
                        </div>
                    </div>
                    <div class="post-card-body">
                        <div></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

</script>