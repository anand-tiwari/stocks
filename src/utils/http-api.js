import axios from 'axios'
import config from '@/config'

axios.interceptors.response.use(
  // do nothing
  res => res,
  defaultErrorHandler
)

const SYSTEM_BUSY_CODES = [429, 503]
export function defaultErrorHandler (error) {
  const response = error.response
  // handle busy
  if (SYSTEM_BUSY_CODES.indexOf(response.status) > -1) {
    console.log('api response error = ' + response)
  }
  return Promise.reject(error)
}

export default {
  getDataViaApi (path, cb, errorHandler, headerParams = {}) {
    const headerObject = { 'Cache-Control': 'no-cache' }
    axios
      .get(config.getApiPath(path), {
        headers: { ...headerObject, ...headerParams }
      })
      .then(cb)
      .catch((res) => {
        errorHandler(res.response)
      })
  },

  downloadDataViaApi (path, callback, errorHandler, headerParams) {
    const headerObject = { 'Cache-Control': 'no-cache' }
    axios.get(config.getApiPath(path), {
      headers: typeof headerParams !== 'undefined' ? Object.assign(headerObject, headerParams) : headerObject,
      responseType: 'blob'
    }).then(
      response => {
        const fileName = response.request.getResponseHeader('Content-Disposition').match(/"([^']+)"/)[1]
        const link = document.createElement('a')
        link.href = URL.createObjectURL(new Blob([response.data]))
        link.download = fileName
        link.click()
        URL.revokeObjectURL(link.href)
        callback(response)
      })
      .catch(errorHandler)
  },

  postDataViaApi (path, cb, data, errorHandler, headerParams = {}) {
    const headerObject = {}
    axios
      .post(config.getApiPath(path), data, {
        headers: { ...headerObject, ...headerParams }
      })
      .then(cb)
      .catch((res) => {
        errorHandler(res.response)
      })
  },

  deleteDataViaApi (path, cb, errorHandler) {
    axios
      .delete(config.getApiPath(path))
      .then(cb)
      .catch((res) => {
        errorHandler(res.response)
      })
  },

  putDataViaApi (path, cb, data, errorHandler) {
    axios
      .put(config.getApiPath(path), data)
      .then(cb)
      .catch((res) => {
        errorHandler(res.response)
      })
  },
  defaultErrorHandler
}
