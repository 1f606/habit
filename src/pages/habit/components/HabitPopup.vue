<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useToast } from 'wot-design-uni';
import { useHabitStore } from '@/state/modules/habit';

const { success: showSuccess } = useToast();
const habitStore = useHabitStore();

const visible = ref(false);

function handleClose() {}

function hide() {
    visible.value = false;
}

function toggle() {
    visible.value = !visible.value;
}

const form = ref(null);
const model = ref({
    name: '',
    isDayLong: true,
});

function handleSubmit() {
    form?.value
        ?.validate()
        .then(({ valid }) => {
            if (valid) {
                habitStore
                    .create({
                        name: model.value.name,
                        isDayLong: model.value.isDayLong,
                    })
                    .then(() => {
                        showSuccess({
                            msg: '提交成功',
                        });
                        visible.value = false;
                    });
            }
        })
        .catch((error) => {
            console.log(error, 'error');
        });
}

// #ifdef H5
function handlePopstate() {
    if (visible.value) {
        hide();
    } else {
        window.history.go(-2);
    }
}

window.addEventListener('popstate', handlePopstate, false);
window.history.pushState(null, null, document.URL);

onBeforeUnmount(() => {
    window.removeEventListener('popstate', handlePopstate);
});
// #endif
defineExpose({
    toggle,
});
</script>

<template>
    <wd-popup
        v-model="visible"
        custom-style="width: 100%;height: 100%;background-color: #f8f9fa;"
        safe-area-inset-bottom
        @close="handleClose"
    >
        <wd-form ref="form" :model="model">
            <wd-card title="基本信息" title-width="50px">
                <wd-cell-group border>
                    <wd-input
                        v-model="model.name"
                        label="名称"
                        label-width="100px"
                        prop="name"
                        clearable
                        placeholder="请输入名称"
                        :rules="[{ required: true, message: '请填写名称' }]"
                    />
                </wd-cell-group>
                <wd-cell-group border>
                    <view class="is-cell">
                        <text class="label">按日划分</text>
                        <wd-radio-group
                            v-model="model.isDayLong"
                            inline
                            shape="dot"
                        >
                            <wd-radio :value="true">是</wd-radio>
                            <wd-radio :value="false">否</wd-radio>
                        </wd-radio-group>
                    </view>
                </wd-cell-group>
                <view class="flex justify-end">
                    <wd-button
                        style="margin: 0"
                        type="primary"
                        @click="handleSubmit"
                        >提交
                    </wd-button>
                </view>
            </wd-card>
        </wd-form>
    </wd-popup>
</template>

<style lang="scss" scoped>
.is-cell {
    padding: var(--wot-input-cell-padding, 10px)
        var(--wot-input-padding, var(--wot-size-side-padding, 15px));
    display: flex;

    .label {
        width: 100px;
        color: rgba(0, 0, 0, 0.85);
        flex: 0 0 auto;
    }
}
</style>
