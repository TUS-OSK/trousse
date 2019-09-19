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
    base: [{
      id: '1',
      brand: 'CANMAKE',
      name: 'colorbase-pink',
      color: 'pink',
      theme: []
    },
    {
      id: '2',
      brand: 'CHIFURE',
      name: '保湿ベース',
      color: 'beige',
      theme: []
    }],

    cheek: [{
      id: '3',
      brand: 'CHIFURE',
      name: 'ツヤツヤベール',
      color: 'orange',
      theme: []
    }],

    lip: [{
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
    }]
  }
}

export function fetchMain() {
  // テスト用
  return mockApi(MOCK_FETCH_MAIN)
}
