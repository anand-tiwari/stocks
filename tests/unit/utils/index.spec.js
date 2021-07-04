import util from '@/utils'

describe('utils/index', () => {
  test('serializeQueryParams', () => {
    const paramObj = { a: '1', b: '2', c: '3' }
    expect(util.serializeQueryParams(paramObj)).toEqual('?a=1&b=2&c=3')

    expect(util.serializeQueryParams()).toEqual('')
  })
})
