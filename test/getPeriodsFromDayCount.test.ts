import getPeriodsFromDayCount from '../src/getPeriodsFromDayCount'

describe('getPeriodsFromDayCount', () => {
  it('gets schedule on December 15, 2021. Tests special schedule', async () => {
    console.log(await getPeriodsFromDayCount(new Date(2021, 11, 15), 1))
    expect(await getPeriodsFromDayCount(new Date(2021, 11, 15), 1)).toEqual([
      [
        {
          start: new Date('2021-12-15T16:40:00.000Z'),
          end: new Date('2021-12-15T18:25:00.000Z'),
          period: 2
        },
        {
          start: new Date('2021-12-15T18:25:00.000Z'),
          end: new Date('2021-12-15T18:55:00.000Z'),
          period: 'Brunch'
        },
        {
          start: new Date('2021-12-15T19:02:00.000Z'),
          end: new Date('2021-12-15T20:47:00.000Z'),
          period: 5
        }
      ]
    ])
  })
  it('gets schedule on November 15, 2021. Tests normal schedule', async () => {
    /*
      1	08:40 - 09:25
      2	09:32 - 10:22
      Brunch	10:22 - 10:32
      3	10:39 - 11:24
      4	11:31 - 12:16
      Lunch	12:16 - 01:01
      5	01:08 - 01:53
      6	02:00 - 02:45
      7	02:52 - 03:37
      */
    expect(await getPeriodsFromDayCount(new Date(2021, 10, 15), 1)).toEqual([
      [
        {
          start: new Date('2021-11-15 8:40 am'),
          end: new Date('2021-11-15 9:25 am'),
          period: 1
        },
        {
          start: new Date('2021-11-15 9:32 am'),
          end: new Date('2021-11-15 10:22 am'),
          period: 2
        },
        {
          start: new Date('2021-11-15 10:22 am'),
          end: new Date('2021-11-15 10:32 am'),
          period: 'Brunch'
        },
        {
          start: new Date('2021-11-15 10:39 am'),
          end: new Date('2021-11-15 11:24 am'),
          period: 3
        },
        {
          start: new Date('2021-11-15 11:31 am'),
          end: new Date('2021-11-15 12:16 pm'),
          period: 4
        },
        {
          start: new Date('2021-11-15 12:16 pm'),
          end: new Date('2021-11-15 1:01 pm'),
          period: 'Lunch'
        },
        {
          start: new Date('2021-11-15 1:08 pm'),
          end: new Date('2021-11-15 1:53 pm'),
          period: 5
        },
        {
          start: new Date('2021-11-15 2:00 pm'),
          end: new Date('2021-11-15 2:45 pm'),
          period: 6
        },
        {
          start: new Date('2021-11-15 2:52 pm'),
          end: new Date('2021-11-15 3:37 pm'),
          period: 7
        }
      ]
    ])
  })
})
