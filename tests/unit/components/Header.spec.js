import Header from '@/components/Header.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import filterMixin from '@/mixins/filter-mixins'
import connection from '@/utils/web-sockets'

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
describe('Header.vue', () => {
  let wrapper, vm
  const stock = {
    namespaced: true,
    state () {
      return {
        visibleSidebar: false,
        products: {
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
      updateSidebarStatus: jest.fn(),
      updateIsIn: jest.fn()
    },
    getters: {
      visibleSidebar: (state) => state.visibleSidebar
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

  const updateRouteQuerySpy = jest.spyOn(filterMixin.methods, 'updateRouteQuery')
  const updateIsInSpy = jest.spyOn(stock.actions, 'updateIsIn')
  const updateSidebarStatusSpy = jest.spyOn(stock.actions, 'updateSidebarStatus')

  beforeAll(async () => {
    router.push('/')
    await router.isReady()
    wrapper = mount(Header, {
      global: {
        plugins: [store, router],
        mixins: [filterMixin]
      },
      shallow: true
    })
    vm = wrapper.vm
  })

  test('Initialized well', () => {
    expect(wrapper).toBeTruthy()
  })

  test('[METHODS] onInput', () => {
    const event = { target: { value: 'INS' } }
    vm.onInput(event)
    expect(updateIsInSpy).toHaveBeenCalled()
    expect(updateRouteQuerySpy).toHaveBeenCalled()
    expect(connectionSend).toHaveBeenCalled()
  })

  test('[METHODS] openSidebar', () => {
    vm.openSidebar()
    expect(updateSidebarStatusSpy).toHaveBeenCalled()
  })
})
