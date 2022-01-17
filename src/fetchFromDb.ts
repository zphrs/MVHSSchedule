import https from 'https'

async function fetchFill(url: string) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let body = ''
        res.on('data', chunk => {
          body += chunk
        })
        res.on('end', () => {
          resolve({
            text: () => {
              return body
            }
          })
        })
      })
      .on('error', err => {
        reject(err)
      })
  })
}

const fetch = window.fetch ?? fetchFill

const config = {
  databaseURL: 'https://mvhs-app-d04d2.firebaseio.com'
}

const ls = localStorage
let cache: string | null = null

let rootDict: any = {}

let timestampCache: string | null = null

let timestampRootDict: any = {}

let currentFetches: { [path: string]: Promise<Record<string, string>> } = {}

function getFromLS(path: string, ignoreTimestamp?: boolean) {
  if (cache === null) {
    cache = ls.getItem(config.databaseURL)
    timestampCache = ls.getItem(config.databaseURL + '-timestamp')
    if (!cache || !timestampCache) {
      return undefined
    }
    rootDict = JSON.parse(cache)
    timestampRootDict = JSON.parse(timestampCache)
  }
  if (cache && rootDict) {
    let splitPath = path.split('/').filter(e => e !== '')
    let dict = rootDict
    let timestampDict = timestampRootDict
    for (let i = 0; i < splitPath.length; i++) {
      dict = dict[splitPath[i]]
      timestampDict = timestampDict[splitPath[i]]
      if (!dict) {
        if (process.env.NODE_ENV === 'development') {
          console.log(path + ' not cached')
        }
        return undefined
      }
    }
    if (
      ignoreTimestamp ||
      (timestampDict.timestamp &&
        Date.now() - timestampDict.timestamp < 1000 * 60 * 60 * 24)
    ) {
      return dict
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(path + ' expired')
      }
      return undefined
    }
  }
}

async function getFromDb(path: string) {
  if (path in currentFetches) {
    const response = await currentFetches[path]
    return response
    // we know it's being cached by another thread if it's in currentFetches
    // so we can just return it
    // and trust that it's being cached by the other thread
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('fetching ' + path + ' from web db')
  }
  currentFetches[path] = new Promise(async (resolve, reject) => {
    let response
    try {
      response = await fetch(config.databaseURL + '/' + path + '.json')
    } catch (err) {
      reject(err)
      return
    }
    const data = JSON.parse(await response.text())
    delete currentFetches[path]
    resolve(data)
  })
  const data = await currentFetches[path]
  // store in cache variable
  if (cache === null) {
    cache = ls.getItem(config.databaseURL)
    timestampCache = ls.getItem(config.databaseURL + '-timestamp')
    if (!cache) {
      cache = '{}'
      rootDict = {}
      ls.setItem(config.databaseURL, cache)
      ls.setItem(config.databaseURL + '-timestamp', JSON.stringify({}))
    }
  }
  if (cache) {
    let dict = rootDict,
      timestampDict = timestampRootDict
    let splitPath = path.split('/').filter(e => e !== '')
    // goes through the path and builds the directory
    // for the path
    for (let i = 0; i < splitPath.length - 1; i++) {
      if (!(splitPath[i] in dict)) {
        dict[splitPath[i]] = {}
        timestampDict[splitPath[i]] = {}
      }
      dict = dict[splitPath[i]]
      timestampDict = timestampDict[splitPath[i]]
    }
    dict[splitPath[splitPath.length - 1]] = data
    timestampDict[splitPath[splitPath.length - 1]] = {
      timestamp: Date.now()
    }
    cache = JSON.stringify(rootDict)
    ls.setItem(config.databaseURL, cache)
    ls.setItem(
      config.databaseURL + '-timestamp',
      JSON.stringify(timestampRootDict)
    )
  }

  return data
}

export default async function fetchFromDb(
  path: string,
  forceFetch = false
): Promise<Record<string, string>> {
  if (forceFetch) {
    return getFromDb(path)
  }

  const cached = getFromLS(path)
  if (cached) {
    return cached
  }
  let out
  try {
    out = await getFromDb(path)
  } catch (error) {
    out = getFromLS(path, true)
  }
  if (out === undefined) {
    throw new Error('No data available in cache or online for ' + path)
  }
  return out
}
