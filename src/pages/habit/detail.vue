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

const todayDateObj = ref(new Date());

function isToday(date, month) {
    return (
        month === todayDateObj.value.getMonth() + 1 &&
        todayDateObj.value.getDate() === date
    );
}

const dateObj = ref(new Date());
const month = ref(dateObj.value.getMonth() + 1);
const dateList = ref<Array<number>>([]);
const loading = ref(false);
const loadData = () => {
    loading.value = true;
    const tempDateObj = new Date(dateObj.value);
    tempDateObj.setMonth(tempDateObj.getMonth() + 1);
    tempDateObj.setDate(0);
    dateList.value = new Array(tempDateObj.getDate())
        .fill(0)
        .map((m, i) => i + 1);
    loading.value = false;
};
loadData();

const placeholderList = ref([]);
const initPlaceholder = () => {
    const date = new Date(dateObj.value);
    date.setDate(1);
    const day = date.getDay();
    const num = day === 0 ? 6 : day - 1;
    placeholderList.value = new Array(num).fill(0);
};
initPlaceholder();

function classList(date) {
    const status = getRecordStatus({
        name: habit.value.name,
        month: month.value,
        date,
    });
    return (
        ({
            success: 'finish',
            fail: 'fail',
        }[status] || '') + (isToday(date, month.value) ? ' date--today' : '')
    );
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

const date = ref(null);

function updateStatus(v) {
    date.value = v;
    open();
}

function select({ item }) {
    const name = habit.value.name;
    if (item.name === '完成') {
        finish({ month: month.value, date: date.value, name });
    } else if (item.name === '未完成') {
        fail({ month: month.value, date: date.value, name });
    }
}

const swiping = ref(false);
let state = {};
const touchmove = (e) => {
    state.currentX = e.touches[0].clientX;
};
const touchstart = (e) => {
    if (loading.value || swiping.value) return;
    swiping.value = true;
    state.startX = e.touches[0].clientX;
};
const touchend = () => {
    const diff = state.currentX - state.startX;
    if (Math.abs(diff) > 10 && !isNaN(diff)) {
        if (diff < 0) {
            updateDateObj(true);
        } else {
            updateDateObj(false);
        }
        loadData();
    }
    swiping.value = false;
    state = {};

    function updateDateObj(isNext) {
        const diff = isNext ? 1 : -1;
        dateObj.value.setMonth(dateObj.value.getMonth() + diff);
        month.value = dateObj.value.getMonth() + 1;
        initPlaceholder();
    }
};
</script>

<template>
    <view
        id="wrapper"
        class="h-full"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
    >
        <view class="header">
            <text>Mon</text>
            <text>Tue</text>
            <text>Wed</text>
            <text>Thur</text>
            <text>Fri</text>
            <text>Sat</text>
            <text>Sun</text>
        </view>
        <view class="text-2xl text-center">{{ month }}月</view>
        <view class="calendar-wrapper">
            <view
                v-for="(m, i) in placeholderList"
                :key="i"
                class="date"
            ></view>
            <view
                v-for="m in dateList"
                :key="m"
                :class="['date', classList(m)]"
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
.header {
    display: flex;
}

.header uni-text {
    flex: 1;
    text-align: center;
}

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

.date.date--today {
    position: relative;
}

.date.date--today::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #4d80f0;
}
</style>
