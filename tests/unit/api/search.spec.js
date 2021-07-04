import search from '@/api/search'
import config from '@/config'
import httpApi from '@/utils/http-api'
import { serializeQueryParams } from '@/utils'

describe('search api', () => {
  httpApi.getDataViaApi = jest.fn()

  test('SearchApi', () => {
    const data = {
      data: 'data'
    }
    const cb = jest.fn()
    const errHandler = jest.fn()
    const headers = {
      channelId: 'web'
    }
    search.getProducts(cb, data, errHandler, headers)
    expect(httpApi.getDataViaApi).toHaveBeenCalled()
    expect(httpApi.getDataViaApi).toHaveBeenCalledWith(config.api.product + serializeQueryParams(data), cb, errHandler, headers)
  })
})
