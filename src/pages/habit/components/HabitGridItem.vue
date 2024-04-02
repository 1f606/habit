<script setup lang="ts">
import { computed, ref } from 'vue';
import {
    type Habit,
    type Record,
    type RecordStatus,
} from '@/state/modules/habit';
import { useRouter } from 'uni-mini-router';
import { useHabit } from '@/hooks/useHabit';

const router = useRouter();
const props = defineProps<{
    habit: Habit;
}>();
const { finish, fail, deleteHabit } = useHabit();

const record = computed<Record>(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const defaultValue: Record = {
        date,
        month,
        status: 'pending',
    };
    if (!props.habit) return defaultValue;
    return (
        props.habit.record.find((m) => m.date === date && m.month === month) ||
        defaultValue
    );
});

const icon = computed(() => {
    const statusToIcon: { [key in RecordStatus]: string } = {
        success: 'check',
        fail: 'close',
        pending: 'view-list',
    };
    if (record.value.status) {
        return statusToIcon[record.value.status];
    }
    return statusToIcon.pending;
});

const actionSheetVisible = ref(false);
const actions = ref([
    {
        name: '完成',
    },
    {
        name: '未完成',
    },
    {
        name: '删除',
    },
    {
        name: '详情',
    },
]);

function close() {
    actionSheetVisible.value = false;
}

function open() {
    actionSheetVisible.value = true;
}

function select({ item }) {
    const name = props.habit.name;
    if (item.name === '完成') {
        finish({ ...record.value, name });
    } else if (item.name === '未完成') {
        fail({ ...record.value, name });
    } else if (item.name === '删除') {
        deleteHabit({ name });
    } else {
        router.push({
            path: '/pages/habit/detail',
            query: {
                name,
            },
        });
    }
}
</script>

<template>
    <wd-grid-item :icon="icon" :text="props.habit?.name" @itemclick="open" />
    <wd-action-sheet
        v-model="actionSheetVisible"
        :actions="actions"
        cancel-text="取消"
        @close="close"
        @select="select"
    />
</template>
