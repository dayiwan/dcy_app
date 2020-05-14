import axios from 'axios'
import config from './config'
import { Message } from 'element-ui'

const service = axios.create(config)

const taskToken = window.localStorage.getItem('TOKEN')
// const taskToken = '1e8PjB5oIWH8LS9a66mB3FIjo0Os9bbBie88ISWyAR98BD00uFIUllHkcrCsyqj5'
if (taskToken && taskToken !== 'undefined') {
  axios.defaults.headers.common['Token'] = taskToken
}
// axios.defaults.headers.common['Token'] = '1e8PjB5oIWH8LS9a66mB3FIjo0Os9bbBie88ISWyAR98BD00uFIUllHkcrCsyqj5'
// 传参格式化
service.interceptors.request.use(
  config => {
    // const token = 'TXkeD4IZq6H/6j5+g/j5Fu1rNKu+kra5MbyO7+rqzmAFwNJK0qFhL3ljBUuOhndb'
    // c2554a17cd6446698a32c7a32a750d26
    const token = window.localStorage.getItem('TOKEN')
    if (token && token !== 'undefined') {
      config.headers = {
        token: token,
        'Accept-Language': 'zh-CN'
      }
    } // 否则做xxx操作
    if (config.method === 'post') config.body = JSON.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回结果处理
service.interceptors.response.use(
  res => {
    // console.log(res.data)
    // 这里可根据实际情况做一些操作
    if (res.status === 200 && res.data.code === '0002') {
      console.log('我是请求返回处理的拦截')
      window.location.href = 'http://www.xaadmin.com/#/login'
      return res.data
    }
    return res.data
  },
  error => {
    if (error.message === 'Network Error') {
      Message({
        message: '网络错误，请检查网络状况',
        type: 'error'
      })
    } else {
      Message({
        message: error.message || 'Error',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export default {
  // post function
  post(url, data) {
    // console.log('post request url', url)
    return service({
      method: 'post',
      url,
      data
    })
  },
  // get function
  get(url, data) {
    // console.log('get request url', url)
    return service({
      method: 'get',
      url,
      params: data
    })
  },
  // delete function
  delete(url, data) {
    // console.log('delete request url', url)
    return service({
      method: 'delete',
      url,
      params: data
    })
  }
}
