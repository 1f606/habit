<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { useHabitStore } from '@/state/modules/habit';
import { ref } from 'vue';
import { useHabit } from '@/hooks/useHabit';

const habitStore = useHabitStore();
const habit = ref({});
const { finish, fail, getRecordStatus } = useHabit();
onLoad((options) => {
    habit.value =
        habitStore.habitList.find((m) => m.name === options.name) || {};
    // eslint-disable-next-line no-undef
    uni.setNavigationBarTitle({
        title: options.name,
    });
});

const dateObj = new Date();
const month = ref(dateObj.getMonth() + 1);
const date = ref(dateObj.getDate());
dateObj.setMonth(month.value + 1);
dateObj.setDate(0);
const dateList = ref(new Array(dateObj.getDate()).fill(0).map((m, i) => i + 1));

function classObj(date) {
    const status = getRecordStatus({
        name: habit.value.name,
        month: month.value,
        date,
    });
    return {
        success: 'finish',
        fail: 'fail',
    }[status];
}

function updateStatus(v) {
    date.value = v;
    open();
}

const actionSheetVisible = ref(false);
const actions = ref([
    {
        name: '完成',
    },
    {
        name: '未完成',
    },
]);

function close() {
    actionSheetVisible.value = false;
}

function open() {
    actionSheetVisible.value = true;
}

function select({ item }) {
    const name = habit.value.name;
    if (item.name === '完成') {
        finish({ month, date: date.value, name });
    } else if (item.name === '未完成') {
        fail({ month, date: date.value, name });
    }
}
</script>

<template>
    <view>
        <view class="calendar-wrapper">
            <view
                v-for="m in dateList"
                :key="m"
                :class="['date', classObj(m)]"
                @click="updateStatus(m)"
                >{{ m }}
            </view>
        </view>
        <wd-action-sheet
            v-model="actionSheetVisible"
            :actions="actions"
            cancel-text="取消"
            @close="close"
            @select="select"
        />
    </view>
</template>

<style scoped>
.calendar-wrapper {
    display: flex;
    flex-wrap: wrap;
}

.date {
    width: 14.285%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    background-color: transparent;
    color: #333;
}

.date.finish {
    background-color: #4d80f0;
    color: #fff;
}

.date.fail {
    background-color: #f6f6f7;
}
</style>
