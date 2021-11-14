import getPeriodsFromDayCount from "../src/getPeriodsFromDayCount"

describe("getPeriodsFromDayCount", () => {
  it("gets schedule on monday, November 15, 2021", async () => {
    console.log(await getPeriodsFromDayCount(new Date(2021, 11, 15), 1))
    expect(await getPeriodsFromDayCount(new Date(2021, 11, 15), 1)).toEqual([
      [
        {
          start: new Date("2021-12-15T16:40:00.000Z"),
          end: new Date("2021-12-15T18:25:00.000Z"),
          period: 2
        },
        {
          start: new Date("2021-12-15T18:25:00.000Z"),
          end: new Date("2021-12-15T18:55:00.000Z"),
          period: "Brunch"
        },
        {
          start: new Date("2021-12-15T19:02:00.000Z"),
          end: new Date("2021-12-15T20:47:00.000Z"),
          period: 5
        }
      ]
    ])
  })
})
