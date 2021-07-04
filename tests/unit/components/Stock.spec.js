import Stock from '@/components/Stock.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

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
describe('Stock.vue', () => {
  let wrapper, vm
  const stock = {
    namespaced: true,
    state () {
      return {
        stocks: {
          INE470A01017: {
            ask: 60.131248240299236,
            bid: 60.11124824029924,
            isin: 'INE470A01017',
            price: 60.12124824029924
          }
        }
      }
    },
    mutations: {
      setStockInfo: jest.fn()
    },
    actions: {
      getStockInfo: jest.fn()
    },
    getters: {
      stocks: (state) => state.stocks
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

  beforeAll(async () => {
    router.push('/')
    await router.isReady()
    wrapper = mount(Stock, {
      global: {
        plugins: [store, router]
      },
      shallow: true
    })
    vm = wrapper.vm
  })

  test('Initialized well', () => {
    expect(wrapper).toBeTruthy()
  })

  test('[Getter] produts', () => {
    const expected = {
      INE470A01017: { ask: 60.131248240299236, bid: 60.11124824029924, isin: 'INE470A01017', price: 60.12124824029924 }
    }
    expect(vm.stocks).toEqual(expected)
  })
})
