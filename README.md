# MVHS Schedule

MVHS Schedule is an easy library to fetch the periods on any specific day. It returns an array of Periods (Period {start: Date; end: Date; period: string}) to represent periods. It will work no matter what timezone it is run in.

I use the firebase REST api to fetch the schedule and then I cache it to localstorage. It will refresh the data if it is older than a day. If there is an error anyway then it will use the cached data anyway, even if it's expired. If there is no cached data then it will throw an error.

## Functions:

```ts
getScheduleFromDay(day: Date): Promise<string>

```

Returns a string of what schedule is on that day. Used internally by getPeriodsOnDay.

```ts
const schedule = getScheduleFromDay(new Date('11/15/2021'))
/* example output:
"Schedule A"
*/
```

```ts
getPeriodsFromSchedule(date: Date, schedule: String): Promise<Period[]>
```

Gets the periods for a schedule. The date is required to set the correct day for the returned period array's Date objects. Used internally in getPeriodsOnDay.

```ts
getPeriodsFromSchedule(new Date('11/15/2021'), 'Schedule A')
/* Example output:
[
  {
    start: "2020-11-15T00:00:00.000Z",
    end: "2020-11-15T01:00:00.000Z",
    period: "1"
  }
]
*/
```

```ts
getPeriodsOnDay(day: Date): Promise<Period[]>
```

Gets the periods on a day. Internally calls both getScheduleFromDay and getPeriodsFromSchedule.

```ts
getPeriodsOnDay(new Date('11/15/2021'))
/* Example output:
[
  {
    start: "2020-11-15T00:00:00.000Z",
    end: "2020-11-15T01:00:00.000Z",
    period: "1"
  }
]
*/
```

```ts
getPeriodsFromDayCount(day: Date, dayCount : Number) : Promise<Period[][]>
```

returns an array of array of Periods, one array for each day, starting with the input day and going forwards for dayCount days.
Example:

```js
getPeriodsFromDayCount(new Date('11/15/2021'), dayCount)
/* Example output:
[
  [
    {
      start: "2020-11-15T00:00:00.000Z",
      end: "2020-11-15T01:00:00.000Z",
      period: "1"
    }
  ]
]
*/
```

```ts
getTimeOfPeriod(period: number, date:Date): Promise<Period>
```

Gets the time of a period by calling getPeriodsOnDay and then returns a single Period object.

```ts
getTimeOfPeriod(1, new Date('11/15/2021'))
/* Example output:
{
  start: "2020-11-15T00:00:00.000Z",
  end: "2020-11-15T01:00:00.000Z",
  period: "1"
}
*/
```

# TSDX User Guide

> If you’re new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

## Commands

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean

// inside your code...
if (__DEV__) {
  console.log('foo')
}
```

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.
