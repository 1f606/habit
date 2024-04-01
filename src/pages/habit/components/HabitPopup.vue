<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'wot-design-uni';
import { useHabitStore } from '@/state/modules/habit';

const { success: showSuccess } = useToast();
const habitStore = useHabitStore();

const visible = ref(false);

function handleClose() {}

function show() {
    visible.value = true;
}

const form = ref(null);
const model = ref({
    name: '',
});

function handleSubmit() {
    form?.value
        ?.validate()
        .then(({ valid }) => {
            if (valid) {
                habitStore.create(model.value.name).then(() => {
                    showSuccess({
                        msg: '提交成功',
                    });
                });
            }
        })
        .catch((error) => {
            console.log(error, 'error');
        });
}

defineExpose({
    show,
});
</script>

<template>
    <wd-popup
        v-model="visible"
        custom-style="width: 100%;height: 100%;background-color: #f8f9fa;"
        @close="handleClose"
        safe-area-inset-bottom
    >
        <wd-form ref="form" :model="model">
            <wd-card title="基本信息" title-width="50px">
                <wd-cell-group border>
                    <wd-input
                        label="名称"
                        label-width="100px"
                        prop="name"
                        clearable
                        v-model="model.name"
                        placeholder="请输入名称"
                        :rules="[{ required: true, message: '请填写名称' }]"
                    />
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

<style scoped>
.habit-popup__card {
    background-color: #fff;
}
</style>
