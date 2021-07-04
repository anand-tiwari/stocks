import Dummy from '@/pages/Dummy.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import connection from '@/utils/web-sockets'
import stockSocket from '@/store/plugins/stockSockets'

jest.mock('@/utils/web-sockets', () => ({
  send: jest.fn()
}))

const socketObject = stockSocket(connection)

const stock = {
  namespaced: true,
  state () {
    return {
    }
  },
  mutations: {},
  actions: {
    getStockInfo: jest.fn(),
    updateSocketStatus: jest.fn()
  },
  getters: {}
}
const store = createStore({
  state: {
  },
  mutations: {},
  actions: {},
  modules: {
    stock
  },
  plugins: [socketObject]
})

const getStockInfoSpy = jest.spyOn(stock.actions, 'getStockInfo')
const updateSocketStatusSpy = jest.spyOn(stock.actions, 'updateSocketStatus')

describe('StockSockets', () => {
  let wrapper
  beforeAll(async () => {
    wrapper = mount(Dummy, {
      global: {
        plugins: [store]
      },
      shallow: true
    })
  })

  test('Initialized well', () => {
    expect(wrapper).toBeTruthy()
  })

  test('[Socket] onmessage', async () => {
    const event = {
      data: '{"isin":"DE000BASF111","price":266.49162228688056,"bid":266.48162228688057,"ask":266.50162228688055}'
    }
    connection.onmessage(event)
    expect(getStockInfoSpy).toHaveBeenCalled()
  })
  test('[Socket] onopen', async () => {
    connection.onopen()
    expect(updateSocketStatusSpy).toHaveBeenCalled()
  })
  test('[Socket] onclose', () => {
    connection.onclose()
  })
})
