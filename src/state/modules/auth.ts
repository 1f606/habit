/*
 * @Author: zhouyankai
 * @Date: 2023-07-26
 * @LastEditTime: 2023-04-26
 * @LastEditors: zhouyankai
 * @Description:有关权限的pinia
 */
import { defineStore } from 'pinia';

interface AuthState {
    token?: string;

    user: Record<string, any>;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        token: undefined,
        user: {},
    }),
    getters: {
        isLogin(): boolean {
            return this.token !== undefined;
        },
    },
    actions: {},
});
