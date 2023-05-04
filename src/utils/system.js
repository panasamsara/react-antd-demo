function store(storage) {
  return {
    set(key, v) {
      window[storage].setItem(key, JSON.stringify(v || {}))
    },
    get(key, v = {}) {
      const value = window[storage].getItem(key)
      return value ? JSON.parse(value) : v
    },
  }
}

export const local = store('localStorage')
export const session = store('sessionStorage')
function b64EncodeUnicode(str) {
  return window.btoa(
    window.encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(`0x${p1}`)
    })
  )
}
function b64DecodeUnicode(str) {
  return window.decodeURIComponent(
    window.atob(str)
      .split('')
      .map(c => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join('')
  )
}

function getCookie(name) {
  let arr
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  // eslint-disable-next-line no-cond-assign
  if ((arr = document.cookie.match(reg)))
    return b64DecodeUnicode(unescape(arr[2]))
  return null
}

function setCookie(name, value) {
  value = b64EncodeUnicode(value)
  const Days = 30
  const exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
}

function delCookie(name) {
  const exp = new Date()
  exp.setTime(exp.getTime())
  document.cookie = `${name}=;expires=${exp.toGMTString()}`
}

export const cookie = {
  get: getCookie,
  set: setCookie,
  clear: delCookie,
}

export const base64Utils = {
  encode: b64EncodeUnicode,
  decode: b64DecodeUnicode,
}

export const cache = {
  store: {},
  set(key, value, duration = 3000) {
    this.store[key] = { value, expires: Date.now() + duration }
  },
  get(key) {
    const rec = this.store[key]
    if (!rec) return
    if (Date.now() > rec.expires) return
    return rec.value
  },
}

export const mem = {
  store: {},
  set(key, value) {
    this.store[key] = value
  },
  get(key, init) {
    return this.store[key] || init
  },
}
