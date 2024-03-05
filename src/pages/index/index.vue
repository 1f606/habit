<template>
    <view class="content">
        <image
            class="logo rounded-lg"
            src="/static/logo.png"
            @click="showPreview = true"
        />
        <view class="text-area">
            <text class="title font-mono text-purple-500 text-4xl">
                {{ title }}
            </text>
        </view>

        <view>131</view>

        <!-- <view>
      <text class="font-mono text-purple-500 ">
           路由  uni-mini-router
      </text>
    
      <text>文档地址： https://fant-mini-plus.top/fant-mini-plus/uni-mini-router/introduction.html</text>

    </view> -->

        <vin-icon name="dongdong" color="#fa2c19" />
        <vin-icon name="dongdong" color="#64b578" />
        <vin-icon name="JD" color="#fa2c19" />

        <view class="text-area">
            <text class="title font-mono text-rose-500 text-2xl">
                {{ usetsto.getNum }}
            </text>
        </view>

        <vin-button color="#7232dd" @click="usetsto.addnum">
            pinia++
        </vin-button>

        <vin-button color="#7232dd" @click="push"> 跳转路由1 </vin-button>

        <vin-button color="#7232dd" @click="apis"> api请求 </vin-button>

        <!-- <vin-image-preview
            :show="showPreview"
            :images="imgData"
            @close="showPreview = false"
        /> -->

        <view class="text-area my-1">
            <text class="title font-mono text-rose-500 text-1xl">
                {{ env }}
            </text>
        </view>

        <view class="text-area my-1">
            <text class="title font-mono text-rose-500 text-1xl">
                {{ api }}
            </text>
        </view>
    </view>
</template>

<script setup lang="ts" name="index">
import { onMounted, ref } from 'vue';
import { useRouter } from 'uni-mini-router';
// import coas from '@/static/logo.png';
import { useAppStore } from '@/state/app';
import { getlist } from '@/api/common/user/user';

// import vinButton from '@vingogo/uni-ui/lib/components/button/index.vue';

const router = useRouter();
const usetsto = useAppStore();

let env = import.meta.env.VITE_APP_ENV;
let api = import.meta.env.VITE_BASE_URL;

const title = ref('Tailwind CSS');

onMounted(() => {
    console.log('我初始化进来');
});

const showPreview = ref(false);

// let name = 1312;

// let name = 1321;

// const imgData = [
//     {
//         src: coas,
//     },
// ];

// 跳转路由
function push() {
    router.push({
        name: 'wode',
    });
}

// 请求api
function apis() {
    getlist({ id: 1 }).then((res) => {
        console.log(res, '我点击了');
    });
}

let nums = [2, 5, 5, 5, 11],
    target = 10;

let map = {};
let xins = [];
for (let i = 0; i < nums.length; i++) {
    let n = nums[i];

    if (map[target - n] >= 0) {
        xins = [map[target - n], i];
    } else {
        map[n] = i; //use map to store the value and index position
    }
}
console.log(map, xins, '巴啦啦');

// if (ransomNote == xin) {
//     return true;
// } else {
//     return false;
// }

// let xin = '';
// tcc.forEach((item) => {
//     console.log(item, '我很无语啊');
//     xin += item.name;
// });

// if (xin == ransomNote) {
//     return true;
// } else {
//     return false;
// }
</script>

<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logo {
    margin: 200rpx auto 50rpx;
    width: 200rpx;
    height: 200rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

:deep(.vin-image-preview-custom-pop) {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: transparent !important;
}
</style>
