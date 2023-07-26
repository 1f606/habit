<template>
    <view class="contain">
        <view class="con">



            <view class="content rounded-lg">

                <view>
                    Sign In
                </view>

                <view class="ip-info">
                    <view class="inps">              
                     <input placeholder="Username" />
                </view>
                <view class="inps">               
                    <input placeholder="Password" />
                </view>
                </view>

              

                <view class="btns">
                    <button class="bg-violet-300 w-auto rounded-lg text-zinc-50">登录</button>
                </view>

                <view class="desc">

                    <text>Don't have an account? 
                        <text class="text-violet-500">Sign Up</text>
                    </text>

                </view>


            </view>
            
        </view>
    </view>
</template>


<style lang="scss" scoped>

.contain{

width: 100%;
height: 100vh;

background: url(https://img.js.design/assets/img/63a96ef81c31a1d8ca04e7a4.png) no-repeat;
background-size: cover;


.con{
    width: 100%;
    height: 100%;
    background: RGBA(0,0,0,0.4);
    .content{
        position: absolute;
        left: 30rpx;
        right: 30rpx;
        padding: 30rpx;
        top: 200px;
        background: #ffffff;
        .ip-info{
            .inps{
            padding: 20rpx 20rpx;
            border-bottom: 2rpx solid rgba(204, 204, 204, 1);
        }
        }
       
        .btns{
            margin-bottom: 30rpx;
        }
        .desc{
            text-align: center;
        }
    }
}

}


</style>