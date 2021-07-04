import FilterMixins from '@/mixins/filter-mixins'
import Dummy from '@/pages/Dummy.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import connection from '@/utils/web-sockets'

import { createRouter, createWebHistory } from 'vue-router'

jest.mock('@/utils/web-sockets', () => ({
  send: jest.fn()
}))

const connectionSend = jest.spyOn(connection, 'send')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: 'Welcome to the app'
      }
    },
    {
      path: '/stock',
      name: 'ListPage',
      component: {
        template: 'Welcome to the app'
      }
    }
  ]
})

const stock = {
  namespaced: true,
  state () {
    return {
      IsIns: [
        'DE000BASF111',
        'INE470A01017',
        'DE0005151005'
      ],
      stocks: {}
    }
  },
  mutations: {},
  actions: {
    updateUnSubscribed: jest.fn(),
    getStockInfo: jest.fn()
  },
  getters: {
    IsIns: (state) => state.IsIns
  }
}
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    stock
  }
})

const getStockInfoSpy = jest.spyOn(stock.actions, 'getStockInfo')

describe('FilterMixins', () => {
  let wrapper
  beforeAll(async () => {
    router.push('/stock?isin=NIS')
    await router.isReady()
    wrapper = mount(Dummy, {
      global: {
        plugins: [router, store],
        mixins: [FilterMixins]
      }
    })
  })

  test('Initialized well', () => {
    expect(wrapper).toBeTruthy()
  })

  test('[METHODS] updateRouteQuery', () => {
    wrapper.vm.updateRouteQuery('INE767A01016', true)
  })

  test('[METHOD] successSubscribed after we seleceted new subscriber', () => {
    wrapper.vm.successSubscribed('DE000BASF111', true)
    expect(connectionSend).toHaveBeenCalled()
  })

  test('[METHOD] successSubscribed after we unseleceted subscriber', () => {
    wrapper.vm.successSubscribed('DE000BASF111', false)
    expect(connectionSend).toHaveBeenCalled()
  })

  test('[METHOD] updateSubscribe add subscriber', () => {
    wrapper.vm.updateSubscribe('DE000BASF111', true)
    expect(connectionSend).toHaveBeenCalled()
  })

  test('[METHOD] updateSubscribe remove subscriber', () => {
    wrapper.vm.updateSubscribe('DE000BASF111', false)
    expect(connectionSend).toHaveBeenCalled()
    expect(getStockInfoSpy).toHaveBeenCalled()
  })
})
