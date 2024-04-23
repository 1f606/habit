import { defineStore } from 'pinia';

enum RecordStatus {
    success = 'success',
    fail = 'fail',
    pending = 'pending',
}

export interface Record {
    date: number;
    month: number;
    status: RecordStatus.success | RecordStatus.fail | RecordStatus.penging;
}

export interface Habit {
    name: string;
    record: Array<Record>;
    isDayLong: boolean;
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
        getRecord({ name, month, date }) {
            return new Promise<Record | undefined>((resolve) => {
                const habit = this.habitList.find((m) => m.name === name);
                const record = habit?.record.find(
                    (m) => m.month === month && m.date === date,
                );
                resolve(record);
            });
        },
        create({ name, isDayLong }: { name: string; isDayLong: boolean }) {
            return new Promise<void>((resolve) => {
                if (this.habitList.every((m) => m.name !== name)) {
                    this.habitList.push({
                        name,
                        record: [],
                        isDayLong,
                    });
                }
                resolve();
            });
        },
        async updateStatus({
            name,
            month,
            date,
            status = 'success',
        }: Record & { name: string }) {
            const record = await this.getRecord({ name, month, date });
            const habit = this.habitList.find((m) => m.name === name);
            if (record) {
                record.status = status;
            } else {
                habit.record.push({
                    month,
                    date,
                    status,
                });
            }
            for (let i = date - 1; i >= 1; i--) {
                const record = await this.getRecord({ name, month, date: i });
                if (record) {
                    break;
                } else {
                    habit.record.push({
                        month,
                        date: i,
                        status: RecordStatus.fail,
                    });
                }
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
