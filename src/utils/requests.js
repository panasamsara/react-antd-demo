/* eslint-disable react/no-array-index-key */
import React from 'react'
import { stringify } from 'qs'
import { Modal, message } from 'antd'
import _ from 'lodash'
// import { createBrowserHistory } from 'history'
// import router from 'umi/router'
import { SERVER_URL as SERVER } from '@/config/config'
import { cache, mem } from '@/utils/system'

message.config({
  maxCount: 1,
})
// const history = createBrowserHistory()
function splitLines(msg) {
  return (
    <div>
      {(msg || '')
        .replace('\r\n', '\n')
        .split('\n')
        .map((v, i) => (
          <div key={i}>{v}</div>
        ))}
    </div>
  )
}

let lastModal = null
function checkresModal(res, msg, details) {
  if (lastModal) lastModal.destroy()
  let width = 500
  if (details && details.length > 1000) width = 1200
  lastModal = Modal.confirm({
    zIndex: 1031,
    title: '请求失败',
    content: splitLines(msg),
    cancelText: '关闭',
    okText: '查看详情',
    maskClosable: true,
    okButtonProps: { style: { display: details ? 'inline-block' : 'none' } },
    onOk: (close) => {
      close()
      Modal.error({
        zIndex: 1031,
        title: `查看详情：${msg}`,
        maskClosable: true,
        content: splitLines(details),
        width,
      })
    },
  })
}

// 检查返回值
export function checkres(res) {
  if (!res) {
    message.error('网络连接错误')
    return true
  }
  if (String(res) === '[object Promise]') {
    message.error('请不要直接传Promise！')
    return true
  }
  if (
    res.status === '400' ||
    res.status === '403' ||
    res.status === '404' ||
    res.status === '405' ||
    res.status === '500'
  ) {
    checkresModal(res, res.msg || res.errMsg || res.error, res.message)
    return true
  }
  if (res.status.code !== '1') {
    checkresModal(res, res.msg || res.errMsg, res.msg || res.errMsg)
    return true
  }
}
// 检查返回值
export function checkresNoPrompt(res) {
  if (!res) {
    // message.error('网络连接错误')
    return true
  }
  if (String(res) === '[object Promise]') {
    message.error('请不要直接传Promise！')
    return true
  }
  if (
    res.status === '400' ||
    res.status === '403' ||
    res.status === '404' ||
    res.status === '405' ||
    res.status === '500'
  ) {
    // checkresModal(res, res.msg || res.errMsg || res.error, res.message)
    return true
  }
  if (res.status.code != '1') {
    // checkresModal(res, res.msg || res.errMsg, res.msg || res.errMsg)
    return true
  }
}
// 检查返回值
export function checkres0(res) {
  if (!res) {
    message.error('网络连接错误')
    return true
  }
  if (String(res) === '[object Promise]') {
    message.error('请不要直接传Promise！')
    return true
  }
  if (res.code !== 1) {
    checkresModal(res, res.msg, res.msg)
    return true
  }
}

function fetchjson(url, opt = {}) {
  // const userBean = sessionStorage.getItem('userBean')

  // if (userBean) {
  //   if (!opt.headers) opt.headers = {}
  //   // opt.headers.token = JSON.parse(userBean).token
  // }
  const fullUrl = url.indexOf('http://') != -1 || url.indexOf('https://') != -1
  // console.log('opt: ', opt)
  return fetch(fullUrl ? url : `${url}`, {
    credentials: 'include',
    ...opt,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r && r.code === 1003) {
        if (!window.modal) {
          window.modal = Modal.warn({
            title: '提示',
            content: 'token已过期，请重新登录！',
            okText: '确定',
            onOk: () => {
              window.modal = null
              sessionStorage.clear()
              // router.push('/user/login')
            },
          })
        }
        throw new Error('token过期')
      }
      return r
    })
    .catch((e) => {
      // console.log(e)
    })
}

function fetchblob(url, opt = {}) {
  if (!opt.headers) opt.headers = {}
  const tokenId = sessionStorage.getItem('tokenId')
  if (tokenId) {
    opt.headers = {
      Access_token: tokenId,
    }
  }

  return fetch(`${SERVER}${url}`, {
    credentials: 'include',
    ...opt,
  })
    .then((r) => r.blob())
    .catch((e) => console.log(e))
}

export function get(url, payload) {
  const tokenId = sessionStorage.getItem('tokenId')
  let headers = { 'Content-Type': 'application/json' }
  if (tokenId) {
    headers = {
      Access_token: tokenId,
      ...headers,
    }
  }
  return fetchjson(`${url}?${stringify({ ...payload })}`, {
    headers,
  })
}
export function post(url, payload) {
  const tokenId = sessionStorage.getItem('tokenId')
  let headers = { 'Content-Type': 'application/json' }
  if (tokenId) {
    headers = {
      Access_token: tokenId,
      ...headers,
    }
  }
  return fetchjson(`${url}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  })
}

export function httpDelete(url, payload, query = {}) {
  return fetchjson(`${url}?${stringify(query)}`, {
    method: 'delete',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function _delete(url, payload) {
  return fetchjson(`${url}?${stringify(payload)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
}

export function getraw(url, payload) {
  return fetchblob(`${url}?${stringify(payload)}`)
}

export function postraw(url, payload) {
  return fetchblob(`${url}?${stringify(payload)}`, {
    method: 'POST',
    body: payload,
  })
}

export function postform(url, payload) {
  const form = new FormData()
  Object.entries(payload).forEach(([k, v]) => {
    if (_.isArray(v)) {
      v.forEach((item) => form.append(k, item))
    } else {
      form.append(k, v)
    }
  })
  return fetchjson(`${url}`, { method: 'POST', body: form })
}

/**
 * multiple files uploading method
 * @param {String} url
 * @param {*} options
 * @param {Array} options.files - file list
 * @param {Array} options.payload - extra data
 * @param {String} filePropertyOfForm - default as files
 */
export function postFiles(
  url,
  { files, ...payload },
  filePropertyOfForm = 'files'
) {
  const form = new FormData()
  Object.entries(payload).forEach(([k, v]) => form.append(k, v))
  if (files && files.length)
    files.map((file) => form.append(filePropertyOfForm, file))
  return fetchjson(`${url}`, { method: 'POST', body: form })
}

export function getCached(url, payload) {
  const key = `${url}?${stringify(payload)}`
  const cachedReq = cache.get(key)
  if (cachedReq) return cachedReq
  const req = get(url, payload)
  cache.set(key, req, 5 * 60 * 1000) // 设置5分钟的缓存把
  return req
}

export function postCached(url, payload) {
  const key = `${url}?${stringify(payload)}`
  const cachedReq = cache.get(key)
  if (cachedReq) return cachedReq
  const req = post(url, payload)
  cache.set(key, req, 5 * 60 * 1000) // 设置5分钟的缓存把
  return req
}

export function postMeyed(url, payload) {
  const key = `${url}?${stringify(payload)}`
  const cachedReq = mem.get(key)
  if (cachedReq) return cachedReq
  const req = post(url, payload)
  mem.set(key, req)
  return req
}
