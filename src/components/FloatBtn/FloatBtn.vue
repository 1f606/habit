<template>
    <view
        :style="rootStyle"
        :class="`wd-fab wd-fab--${position} ${customClass}`"
    >
        <view>
            <wd-button
                custom-class="wd-fab__trigger"
                round
                :type="type"
                :disabled="disabled"
            >
                <wd-icon
                    custom-class="wd-fab__icon"
                    :name="isActive ? activeIcon : inactiveIcon"
                ></wd-icon>
            </wd-button>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'FloatBtn',
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared',
    },
};
</script>

<script lang="ts" setup>
import {
    type CSSProperties,
    computed,
    onBeforeMount,
    ref,
    watch,
    inject,
    getCurrentInstance,
    onBeforeUnmount,
} from 'vue';
import { isDef, objToStyle } from 'wot-design-uni/components/common/util';
import {
    type Queue,
    queueKey,
} from 'wot-design-uni/components/composables/useQueue';
import {
    closeOther,
    pushToQueue,
    removeFromQueue,
} from 'wot-design-uni/components/common/clickoutside';

type FabType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default';
type FabPosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';
type FabDirection = 'top' | 'right' | 'bottom' | 'left';

interface Props {
    // 是否激活
    active?: boolean;
    // 类型，可选值为 default primary info success warning error
    type?: FabType;
    // 悬浮按钮位置，可选值为 left-top right-top left-bottom right-bottom
    position?: FabPosition;
    // 悬浮按钮菜单弹出方向，可选值为 top bottom left right
    direction?: FabDirection;
    // 是否禁用
    disabled?: boolean;
    // 悬浮按钮未展开时的图标
    inactiveIcon?: string;
    // 悬浮按钮展开时的图标
    activeIcon?: string;
    // 自定义悬浮按钮层级
    zIndex?: number;
    // 自定义样式类
    customClass?: string;
    // 自定义样式
    customStyle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
    type: 'primary',
    position: 'right-bottom',
    direction: 'top',
    inactiveIcon: 'add',
    activeIcon: 'close',
    disabled: false,
    zIndex: 99,
    customClass: '',
    customStyle: '',
});
const isActive = ref<boolean>(false); // 是否激活状态
const queue = inject<Queue | null>(queueKey, null);
const { proxy } = getCurrentInstance() as any;

watch(
    () => props.active,
    (newValue) => {
        isActive.value = newValue;
    },
    { immediate: true, deep: true },
);

watch(
    () => isActive.value,
    (newValue) => {
        if (newValue) {
            if (queue && queue.closeOther) {
                queue.closeOther(proxy);
            } else {
                closeOther(proxy);
            }
        }
    },
);

const rootStyle = computed(() => {
    const style: CSSProperties = {};
    if (isDef(props.zIndex)) {
        style['z-index'] = props.zIndex;
    }
    return `${objToStyle(style)};${props.customStyle}`;
});

onBeforeMount(() => {
    if (queue && queue.pushToQueue) {
        queue.pushToQueue(proxy);
    } else {
        pushToQueue(proxy);
    }
});

onBeforeUnmount(() => {
    if (queue && queue.removeFromQueue) {
        queue.removeFromQueue(proxy);
    } else {
        removeFromQueue(proxy);
    }
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
