<!--
 * @Description: 
 * @Version: V1.0.0
 * @Author: 周艳凯 750419898@qq.com
 * @Date: 2023-07-26 14:15:07
 * @LastEditors: 周艳凯 750419898@qq.com
 * @LastEditTime: 2024-03-06 09:41:37
 * @FilePath: index.vue
 * Copyright 2024 Marvin, All Rights Reserved. 
 * 2023-07-26 14:15:07
-->
<template>
    <div>
        <view class="container">
            <view v-for="index in num" :key="index" class="list-item">
                <image
                    src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png"
                />
                <view class="right">这是一条测试{{ index + 1 }}</view>
            </view>
            <wd-loadmore :state="state" @reload="loadmore" />
        </view>
    </div>
</template>

<script lang="ts" setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';

const state = ref<string>('loading');
const num = ref<number>(0);
const max = ref<number>(60);

onReachBottom(() => {
    if (num.value === 45) {
        state.value = 'error';
    } else if (num.value < max.value) {
        loadmore();
    } else if (num.value === max.value) {
        state.value = 'finished';
    }
});

onLoad(() => {
    loadmore();
});

function loadmore() {
    setTimeout(() => {
        num.value = num.value + 15;
        state.value = 'loading';
    }, 200);
}
</script>

<style lang="scss" scoped>
.list-item {
    position: relative;
    display: flex;
    padding: 10px 15px;
    color: #464646;
    background: #fff;
}

.list-item::after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background: #eee;
    content: '';
    transform: scaleY(0.5);
}

image {
    display: block;
    margin-right: 15px;
    width: 120px;
    height: 78px;
}

.right {
    -webkit-box-flex: 1;
    flex: 1;
}
</style>
