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
