import url from 'url'

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
