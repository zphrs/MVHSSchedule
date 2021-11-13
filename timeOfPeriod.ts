import periodsFromSchedule from "./getPeriodsFromSchedule";
import getScheduleFromDay from "./getScheduleFromDay";
import {Period}from "./Period";

export default async function timeOfPeriod(period: number, date: Date): Promise<Period> {
    const schedule = await getScheduleFromDay(date);
    return (await periodsFromSchedule(date, schedule))[period];
}