import { Period } from './Period';
import getScheduleFromDay from './getScheduleFromDay';
import periodsFromSchedule from './getPeriodsFromSchedule';

export default async function getPeriodsOnDay(day: Date): Promise<Period[]> {
    // set time to midnight
    let dayCpy = new Date(day);
    dayCpy.setHours(8, 0, 0, 0);
    // get schedule for day
    const schedule = await getScheduleFromDay(dayCpy);
    console.log(schedule);
    // get periods for schedule
    if (schedule === "none") {
        return [];
    }
    const periodsOnDay = await periodsFromSchedule(dayCpy, schedule);
    return periodsOnDay;
}