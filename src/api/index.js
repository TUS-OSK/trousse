import url from 'url'

function mockApi(payload) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(payload)
    }, 0)
  })
}

const MOCK_FETCH_MAIN = {
  user: {
    token: 'mox2847',
    name: 'mo'
  },
  cosmes: {
    foundation: [],
    facepowder: [],
    eyeshadow: [],
    eyeliner: [],
    mascara: [],
    eyebrow: [],
    makeupbase: [
      {
        id: '1',
        brand: 'CANMAKE',
        name: 'colorbase-pink',
        color: 'pink',
        theme: ['spring', 'summer', 'autumn', 'winter', 'cute']
      },
      {
        id: '2',
        brand: 'CHIFURE',
        name: '保湿ベース',
        color: 'beige',
        theme: []
      },
      {
        id: '6',
        brand: 'CHIFURE',
        name: 'ツヤツヤベール',
        color: 'orange',
        theme: []
      }
    ],
    cheek: [
      {
        id: '3',
        brand: 'CHIFURE',
        name: 'ツヤツヤベール',
        color: 'orange',
        theme: []
      }
    ],

    lipstick: [
      {
        id: '4',
        brand: 'Dior',
        name: 'マキシマイザー',
        color: 'pink',
        theme: []
      },
      {
        id: '5',
        brand: 'MAC',
        name: 'おとなのりっぷ',
        color: 'red',
        theme: []
      }
    ]
  }
}

export function fetchMain() {
  return mockApi(MOCK_FETCH_MAIN)
}

function endpoint(path) {
  return url.resolve(process.env.VUE_APP_API_ROOT, path)
}

function initOpti(data) {
  return {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${data.token}`
    },
    body: JSON.stringify(data.item)
  }
}

export async function fetchCosme(token) {
  const rp = await fetch(endpoint('api/cosmes'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await rp.json()
  return {
    user: {},
    cosmes: data
  }
}

export const creatCosme = {
  async cosme(ep, data) {
    const optional = initOpti(data)
    optional.method = 'POST'
    const rp = await fetch(endpoint(ep), optional)
    return await rp.json()
  }
}

export const changeCosme = {
  async cosme(ep, data) {
    const optional = initOpti(data)
    optional.method = 'PATCH'
    const rp = await fetch(endpoint(ep), optional)
    return await rp.json()
  }
}

export const dragCosme = {
  async cosme(ep, data) {
    const optional = initOpti(data)
    optional.method = 'PATCH'
    const rp = await fetch(endpoint(ep), optional)
    return await rp.json()
  }
}

export const deleteCosme = {
  async cosme(ep, data) {
    const optional = initOpti(data)
    optional.method = 'DELETE'
    const rp = await fetch(endpoint(ep), optional)
    return await rp.json()
  }
}
