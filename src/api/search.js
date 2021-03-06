import config from '@/config'
import httpApi from '@/utils/http-api'
import { serializeQueryParams } from '@/utils'

export default {
  getProducts: (cb, data, errHandler, headers) => {
    httpApi.getDataViaApi(
      config.api.product + serializeQueryParams(data),
      cb,
      errHandler,
      headers
    )
  }
}
