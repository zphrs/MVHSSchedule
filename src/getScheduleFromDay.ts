import fetchFromDb from "./fetchFromDb";
import * as d from "./dbDate";

let specialDays : {[key : string] : string};
interface SpecialDay {
    start: Date,
    end: Date,
    schedule: string
}
let specialDaysDate : SpecialDay[] = [];
let weekdayMap : Record<string, string>; 



export default async function getScheduleFromDay(day : Date) : Promise<string> {
    specialDays = await fetchFromDb(`/days`);
    for (let key in specialDays) {
        let [start, end] = key.split("-");
        specialDaysDate.push({
            start: d.fromStr(start),
            // add 24 hours to end date to include the whole day
            end: new Date(d.fromStr(end).getTime() + 24 * 60 * 60 * 1000),
            // +8 to convert to pacific time
            schedule: specialDays[key]
        });
    }

    // check special days to see if the day is a special day
    for (let specialDay of specialDaysDate) {
        if (specialDay.start <= day && specialDay.end >= day) {
            return specialDay.schedule;
        }
    }

    weekdayMap = await fetchFromDb("/weekday-map");

    let schedule = weekdayMap[day.getDay()];

    if (schedule === undefined) {
        throw new Error("No schedule for this day");
    }

    return schedule;


}