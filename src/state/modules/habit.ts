import { defineStore } from 'pinia';

export type RecordStatus = 'success' | 'fail' | 'pending';

export interface Record {
    date: number;
    month: number;
    status: RecordStatus;
}

export interface Habit {
    name: string;
    record: Array<Record>;
}

interface HabitState {
    habitList: Array<Habit>;
}

export const useHabitStore = defineStore({
    id: 'habit',
    state: (): HabitState => ({
        habitList: [],
    }),
    // getters: {
    //   isLogin(): boolean {
    //     return this.token !== undefined;
    //   },
    // },
    actions: {
        create(name: string) {
            return new Promise<void>((resolve) => {
                if (this.habitList.every((m) => m.name !== name)) {
                    this.habitList.push({
                        name,
                        record: [],
                    });
                }
                resolve();
            });
        },
        updateStatus({
            name,
            month,
            date,
            status = 'success',
        }: Record & { name: string }) {
            const habit = this.habitList.find((m) => m.name === name);
            const record = habit?.record.find(
                (m) => m.month === month && m.date === date,
            );
            if (record) {
                record.status = status;
            } else if (habit) {
                habit.record.push({
                    month,
                    date,
                    status,
                });
            }
        },
        deleteStatus({ name }) {
            const matched = this.habitList.find((m) => m.name === name);
            if (matched) {
                this.habitList.splice(this.habitList.indexOf(matched), 1);
            }
        },
    },
    // 本地持久化存储
    persist: {
        storage: {
            getItem: uni.getStorageSync,
            setItem: uni.setStorageSync,
        },
    },
});
