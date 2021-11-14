import assert from 'assert';
import {getScheduleFromDay} from "./index"

describe("MVHSSchedule", function() {
    describe("#getScheduleFromDay()", function() {
        it("should return a schedule", function() {
        var schedule = getScheduleFromDay(new Date(2021, 11, 15));
        assert.equal(schedule, "Schedule A");
        });
    });
})