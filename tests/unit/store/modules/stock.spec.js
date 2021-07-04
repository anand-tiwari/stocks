import stockModule from '@/store/modules/stock'

const TYPE_BOOL_TRUE = true
const TYPE_BOOL_FALSE = false

describe('MUTATIONS store/stock.js', () => {
  const state = {
    IsIns: [
      'DE000BASF111',
      'INE470A01017',
      'DE0005151005'
    ],
    stocks: {
      DE000BASF111: {
        isin: 'DE000BASF111'
      },
      INE470A01017: {
        isin: 'INE470A01017'
      }
    },
    visibleSidebar: false,
    socketStatus: false,
    unSubscribed: []
  }

  test('mutation setStockInfo update new value', () => {
    const stock = { isin: 'DE000BASF111' }
    const remove = false
    const result = { DE000BASF111: { isin: 'DE000BASF111' }, INE470A01017: { isin: 'INE470A01017' } }
    stockModule.mutations.setStockInfo(state, { stock, remove })
    expect(state.stocks).toStrictEqual(result)
  })

  test('mutation setStockInfo remove subscriber', () => {
    const stock = { isin: 'DE000BASF111' }
    const remove = true

    const result = { INE470A01017: { isin: 'INE470A01017' } }
    stockModule.mutations.setStockInfo(state, { stock, remove })
    expect(state.stocks).toStrictEqual(result)
  })

  test('mutation setIsIn newIsIn', () => {
    state.IsIns = [
      'DE000BASF111'
    ]
    const data = 'INE767A01016'
    stockModule.mutations.setIsIn(state, data)

    const result = [
      'DE000BASF111',
      'INE767A01016'
    ]
    expect(state.IsIns).toStrictEqual(result)
  })

  test('mutation setIsIn contains', () => {
    state.IsIns = [
      'DE000BASF111'
    ]
    const data = 'DE000BASF111'
    stockModule.mutations.setIsIn(state, data)

    const result = [
      'DE000BASF111'
    ]
    expect(state.IsIns).toStrictEqual(result)
  })

  test('mutation setSidebarStatus true', () => {
    const data = TYPE_BOOL_TRUE
    stockModule.mutations.setSidebarStatus(state, data)
    expect(state.visibleSidebar).toStrictEqual(data)
  })

  test('mutation setSidebarStatus false', () => {
    const data = TYPE_BOOL_FALSE
    stockModule.mutations.setSidebarStatus(state, data)
    expect(state.visibleSidebar).toStrictEqual(data)
  })

  test('mutation setSocketStatus true', () => {
    const data = TYPE_BOOL_TRUE
    stockModule.mutations.setSocketStatus(state, data)
    expect(state.socketStatus).toStrictEqual(data)
  })

  test('mutation setSocketStatus false', () => {
    const data = TYPE_BOOL_FALSE
    stockModule.mutations.setSocketStatus(state, data)
    expect(state.socketStatus).toStrictEqual(data)
  })

  test('mutation setUnSubscribed adding new isin number', () => {
    stockModule.mutations.setUnSubscribed(state, { isin: 'DE000BASF111', remove: false })
    expect(state.unSubscribed).toStrictEqual(['DE000BASF111'])
  })

  test('mutation setUnSubscribed removing exisiting isin number', () => {
    stockModule.mutations.setUnSubscribed(state, { isin: 'DE000BASF111', remove: false })
    stockModule.mutations.setUnSubscribed(state, { isin: 'DE000BASF111', remove: true })
    expect(state.unSubscribed).toStrictEqual([])
  })
})

describe('ACTIONS store/stock.js', () => {
  test('action getStockInfo', () => {
    const commit = jest.fn()
    const data = { isin: 'DE000BASF111', data: { isin: 'DE000BASF111' } }
    stockModule.actions.getStockInfo({ commit }, data)
  })

  test('action updateIsIn', () => {
    const commit = jest.fn()
    const data = { data: 'DE000BASF111' }
    stockModule.actions.updateIsIn({ commit }, data)
  })

  test('action updateSidebarStatus', () => {
    const commit = jest.fn()
    const data = TYPE_BOOL_TRUE
    stockModule.actions.updateSidebarStatus({ commit }, data)
  })

  test('action updateSocketStatus true', () => {
    const commit = jest.fn()
    const data = TYPE_BOOL_TRUE
    stockModule.actions.updateSocketStatus({ commit }, data)
  })

  test('action updateSocketStatus false', () => {
    const commit = jest.fn()
    const data = TYPE_BOOL_FALSE
    stockModule.actions.updateSocketStatus({ commit }, data)
  })

  test('action updateUnSubscribed add new unSubscriber in list', () => {
    const commit = jest.fn()
    const data = { isin: 'DE000BASF111', remove: false }
    const success = () => {}
    stockModule.actions.updateUnSubscribed({ commit }, { data, success })
  })

  test('action updateUnSubscribed remove unSubscriber from list', () => {
    const commit = jest.fn()
    const data = { isin: 'DE000BASF111', remove: true }
    const success = () => {}
    stockModule.actions.updateUnSubscribed({ commit }, { data, success })
  })

  test('action updateUnSubscribed without success callback', () => {
    const commit = jest.fn()
    const data = { isin: 'DE000BASF111', remove: true }
    stockModule.actions.updateUnSubscribed({ commit }, { data })
  })
})

describe('GETTERS store/stock.js', () => {
  const state = {
    IsIns: [
      'DE0005151005'
    ],
    stocks: {},
    visibleSidebar: false,
    socketStatus: false,
    unSubscribed: []
  }

  const result = [
    'DE0005151005'
  ]
  expect(stockModule.getters.IsIns(state)).toStrictEqual(result)
  expect(stockModule.getters.stocks(state)).toStrictEqual({})
  expect(stockModule.getters.visibleSidebar(state)).toStrictEqual(false)
  expect(stockModule.getters.socketStatus(state)).toStrictEqual(false)
})
