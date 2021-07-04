import http from '@/utils/http-api'
import axios from 'axios'

describe('utils/http-api', () => {
  const consoleSpy = jest.spyOn(console, 'log')
  test('getDataViaApi', () => {
    const mockValue = { success: true, response: { originalResponse: true } }
    const callback = response => expect(response.originalResponse).toEqual(true)
    const errorHandler = jest.fn()
    axios.get = jest.fn().mockResolvedValue(mockValue)
    http.getDataViaApi('/backend/siva/floors', callback, errorHandler)
  })

  test('getDataViaApi error', () => {
    const mockValue = { error: true, response: { originalResponse: false } }
    const callback = jest.fn()
    const errorHandler = response => expect(response.originalResponse).toEqual(false)
    axios.get = jest.fn().mockRejectedValue(mockValue)
    http.getDataViaApi('/backend/siva/floors', callback, errorHandler)
  })

  test('postDataViaApi', () => {
    const mockValue = { success: true, response: { originalResponse: true } }
    const callback = response => expect(response.originalResponse).toEqual(true)
    const errorHandler = jest.fn()
    axios.post = jest.fn().mockResolvedValue(mockValue)
    http.postDataViaApi('/backend/retail/carts/', callback, {}, errorHandler)
  })

  test('postDataViaApi error', () => {
    const mockValue = { error: true, response: { originalResponse: false } }
    const callback = jest.fn()
    const errorHandler = response => expect(response.originalResponse).toEqual(false)
    axios.post = jest.fn().mockRejectedValue(mockValue)
    http.postDataViaApi('/backend/retail/carts/', callback, {}, errorHandler)
  })

  test('putDataViaApi', () => {
    const mockValue = { success: true, response: { originalResponse: true } }
    const callback = response => expect(response.originalResponse).toEqual(true)
    const errorHandler = jest.fn()
    axios.put = jest.fn().mockResolvedValue(mockValue)
    http.putDataViaApi('/backend/retail/carts/', callback, {}, errorHandler)
  })

  test('putDataViaApi error', () => {
    const mockValue = { error: true, response: { originalResponse: false } }
    const callback = jest.fn()
    const errorHandler = response => expect(response.originalResponse).toEqual(false)
    axios.put = jest.fn().mockRejectedValue(mockValue)
    http.putDataViaApi('/backend/retail/carts/', callback, {}, errorHandler)
  })

  test('deleteDataViaApi', () => {
    const mockValue = { success: true, response: { originalResponse: true } }
    const callback = response => expect(response.originalResponse).toEqual(true)
    const errorHandler = jest.fn()
    axios.delete = jest.fn().mockResolvedValue(mockValue)
    http.deleteDataViaApi('/backend/common/users/_logout', callback, errorHandler)
  })

  test('deleteDataViaApi error', () => {
    const mockValue = { error: true, response: { originalResponse: false } }
    const callback = jest.fn()
    const errorHandler = response => expect(response.originalResponse).toEqual(false)
    axios.delete = jest.fn().mockRejectedValue(mockValue)
    http.deleteDataViaApi('/backend/common/users/_logout', callback, errorHandler)
  })

  test('downloadDataViaApi', () => {
    const mockValue = { success: true, request: { getResponseHeader: jest.fn() } }
    const callback = response => expect(response).toEqual(true)
    const errorHandler = jest.fn()
    axios.get = jest.fn().mockResolvedValue(mockValue)
    http.downloadDataViaApi('/backend/common/users/data', callback, errorHandler)
  })

  test('downloadDataViaApi error', () => {
    const mockValue = { error: true }
    const callback = jest.fn()
    const errorHandler = response => expect(response).toEqual({ error: true })
    axios.get = jest.fn().mockRejectedValue(mockValue)
    http.downloadDataViaApi('/backend/common/users/data', callback, errorHandler)
  })

  test('defaultErrorHandler', () => {
    const obj404 = {
      response: {
        status: 404
      }
    }
    const obj429 = {
      response: {
        status: 429
      }
    }
    // not 429
    const val = http.defaultErrorHandler(obj404)
    expect(consoleSpy).toHaveBeenCalledTimes(0)
    expect(val).rejects.toEqual(obj404)

    // 429
    const val2 = http.defaultErrorHandler(obj429)
    expect(consoleSpy).toHaveBeenCalledWith('api response error = ' + obj429.response)
    expect(val2).rejects.toEqual(obj429)
  })
})
