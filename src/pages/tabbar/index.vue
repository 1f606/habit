<template>
    <div>
        <home v-if="tabbar === 'home'"></home>
        <wode v-if="tabbar === 'wode'"></wode>
        <poput v-if="tabbar === 'poput'"></poput>
        <wd-tabbar
            v-model="tabbar"
            fixed
            bordered
            safe-area-inset-bottom
            shape="round"
        >
            <wd-tabbar-item
                title="首页"
                is-dot
                name="home"
                :value="1"
                icon="home"
            ></wd-tabbar-item>
            <wd-tabbar-item
                title="分类"
                :value="2"
                name="wode"
                icon="cart"
            ></wd-tabbar-item>
            <wd-tabbar-item
                title="相册"
                :value="3"
                name="poput"
                icon="photo"
            ></wd-tabbar-item>
            <wd-tabbar-item
                title="我的"
                :value="4"
                icon="user"
            ></wd-tabbar-item>
        </wd-tabbar>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import home from '../index/index.vue'; //首页
import wode from '../wode/index.vue'; //首页
import poput from '../poput/index.vue';
import { useRoute } from 'uni-mini-router';
const router = useRoute();
const tabbar = ref('home');

onMounted(() => {
    console.log(router, '我回去到mounted了');
});
</script>

<style lang="scss" scoped>
:deep(.wd-tabbar) {
    z-index: 10 !important;
    /* stylelint-disable-next-line selector-class-pattern */
    .wd-badge__content {
        border: none !important;
    }
}
</style>
