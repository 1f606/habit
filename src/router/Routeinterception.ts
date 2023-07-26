// 路由拦截
import type { Router } from 'uni-mini-router'

export function userRouternext(router:Router){
    router.beforeEach((to, from, next) => {
        // next入参 false 以取消导航
        next()
    })
    
    router.afterEach((to, from) => {
        console.log(to,'我跳转了')
        console.log(from)
    })

}