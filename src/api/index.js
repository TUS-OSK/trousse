import url from 'url'

function endpoint(path) {
  return url.resolve(process.env.VUE_APP_API_ROOT, path)
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

export const creatPosts = {
  async cosme(ep, data) {
    const rp = await fetch(endpoint(ep), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${data.token}`
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data.item)
    })
    return await rp.json()
  }
}

export const changePatchs = {
  async cosme(ep, data) {
    const rp = await fetch(endpoint(ep), {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${data.token}`
      },
      body: JSON.stringify(data.item)
    })
    return await rp.json()
  }
}

export const cosmeDeletes = {
  async cosme(ep, data) {
    const rp = await fetch(endpoint(ep), {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${data.token}`
      },
      body: JSON.stringify(data.item)
    })
    return await rp.json()
  }
}
