import url from 'url'

function endpoint(path) {
  return url.resolve(process.env.VUE_APP_API_ROOT, path)
}

export async function fetchMain() {
  const rp = await fetch(endpoint('api/cosmes'))
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
          'Content-Type': 'application/json; charset=utf-8'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    })
    return await rp.json()
  }
}
