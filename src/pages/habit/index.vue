<template>
    <view class="content h-full">
        <view class="main">
            <wd-grid square :column="3" clickable>
                <HabitGridItem
                    v-for="habit in habitStore.habitList"
                    :key="habit.name"
                    :habit="habit"
                />
            </wd-grid>
        </view>
        <FloatBtn @click="showHabitPopup" />
        <HabitPopup ref="habitPopup" />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HabitPopup from '@/pages/habit/components/HabitPopup.vue';
import HabitGridItem from '@/pages/habit/components/HabitGridItem.vue';
import { useHabitStore } from '@/state/modules/habit';
import FloatBtn from '@/components/FloatBtn/FloatBtn.vue';

const habitStore = useHabitStore();

const habitPopup = ref(null);

function showHabitPopup() {
    habitPopup.value?.show();
}
</script>

<style lang="scss">
.content {
    background-color: #f8f9fa;
}

.content .header {
    border-bottom: 1px solid #eee;
}
</style>
