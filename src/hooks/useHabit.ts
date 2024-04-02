import { type Record, useHabitStore } from '@/state/modules/habit';

export function useHabit() {
    const habitStore = useHabitStore();

    function getRecord({ name, month, date }): Record {
        return habitStore.habitList
            .find((m) => m.name === name)
            ?.record?.find((m) => m.month === month && m.date === date);
    }

    function getRecordStatus({ name, month, date }) {
        return getRecord({ name, month, date })?.status;
    }

    function finish({ name, month, date }) {
        habitStore.updateStatus({
            name,
            month,
            date,
            status: 'success',
        });
    }

    function fail({ name, month, date }) {
        habitStore.updateStatus({
            name,
            month,
            date,
            status: 'fail',
        });
    }

    function deleteHabit({ name }) {
        habitStore.deleteStatus({ name });
    }

    return {
        getRecord,
        getRecordStatus,
        habitList: habitStore.habitList,
        finish,
        fail,
        deleteHabit,
    };
}
