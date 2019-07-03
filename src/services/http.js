import Axios from 'axios'

// import token from './token'
import config from '../environment/config'
import { getSessionStorage } from '../modules/helpers/sessionUtils'

const isTokenValid = () => {
  const token = getSessionStorage('token')
  if (!token) return false
  const current_date = new Date()
  return token.expiration_date > current_date
}

const checkToken = () => {
  return new Promise((resolve, reject) => {
    if (!isTokenValid()) {
      const activeUser = getSessionStorage('active-user')
      if(activeUser){
        token.postRefresh()
        .then(() => {
          resolve(true)
        })
        .catch(err => {
          reject(err)
        })
      }else{
        token.get()
        .then(() => {
          resolve(true)
        })
        .catch(err => {
          reject(err)
        })
      }      
    } else {
      resolve(true)
    }
  })
}

const refreshToken = (req) => {
  return new Promise((resolve, reject) => {
    checkToken()
      .then(() => {
        const autoStorage = getSessionStorage('token')
        const authToken = autoStorage.token
        req.headers = {
          ...{
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate', // HTTP 1.1.
            'Expires': '0',
            'Pragma': 'no-cache',
            'Authorization': authToken,
            'session-flow-id': getSessionStorage('session-flow-id'),
          }, ...req.headers
        }
        resolve(req)
      })
      .catch(err => { reject(err) })
  })
}

export default class Http {
  constructor(baseURL = config.API_BASE_URL) {
    this._http = Axios.create({ baseURL })

    this._http.interceptors.request.use(req => {
      // return refreshToken(req)
      return req
    }, err => {
      return Promise.reject(err)
    })

    this._http.interceptors.response.use(res => {
      return res
    }, err => {
      return Promise.reject(err)
    })
  }

  get(url = '/', options = {}) {
    return new Promise((resolve, reject) => {
      this._http.get(url, options)
        .then(({ data }) => { resolve(data) })
        .catch(err => { reject(err) })
    })
  }

  post(url = '/', payload = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this._http.post(url, payload, options)
        .then(({ data }) => { resolve(data) })
        .catch(err => { reject(err) })
    })
  }

  put(url = '/', payload = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this._http.put(url, payload, options)
        .then(({ data }) => { resolve(data) })
        .catch(err => { reject(err) })
    })
  }

  patch(url = '/', payload = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this._http.patch(url, payload, options)
        .then(({ data }) => { resolve(data) })
        .catch(err => { reject(err) })
    })
  }
}