<template>
  <view class="content">
    <image class="logo rounded-lg" @click="showPreview = true" src="/static/logo.png" />
    <view class="text-area">
      <text class="title font-mono text-purple-500 text-4xl">{{ title }}</text>
    </view>


    <!-- <view>
      <text class="font-mono text-purple-500 ">
           路由  uni-mini-router
      </text>
    
      <text>文档地址： https://fant-mini-plus.top/fant-mini-plus/uni-mini-router/introduction.html</text>

    </view> -->


    <nut-icon name="dongdong" custom-color="#fa2c19"></nut-icon>
    <nut-icon name="dongdong" custom-color="#64b578"></nut-icon>
    <nut-icon name="JD" custom-color="#fa2c19"></nut-icon>

   
    <view class="text-area">
      <text class="title font-mono text-rose-500 text-2xl">{{ usetsto.getNum }}</text>
    </view>

    <nut-button custom-color="#7232dd" @click="usetsto.addnum">pinia++</nut-button>


    <nut-button custom-color="#7232dd" @click="push">跳转路由</nut-button>


    <nut-image-preview :show="showPreview" :images="imgData" @close="showPreview = false"/>


    <view class="text-area">
      <text class="title font-mono text-rose-500 text-2xl">{{ env }}</text>
    </view>

    <view class="text-area">
      <text class="title font-mono text-rose-500 text-2xl">{{ api }}</text>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'
import coas from '@/static/logo.png'

import { useAppStore } from '@/state/app'




const router = useRouter()
const usetsto = useAppStore()

let env = import.meta.env.VITE_APP_ENV
let api =import.meta.env.VITE_BASE_URL


const title = ref('Tailwind CSS')


const showPreview = ref(false)

const  imgData = [
    {
      src: coas
    },
               
  ]



// 跳转路由
function push(){
   router.push({
      name:'wode'
   })
}


</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}


:deep(.nut-image-preview-custom-pop) {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: transparent !important;
}


</style>
