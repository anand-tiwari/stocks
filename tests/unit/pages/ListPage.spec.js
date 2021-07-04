import ListPage from '@/pages/ListPage.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import connection from '@/utils/web-sockets'
import { nextTick } from 'vue'

jest.mock('@/utils/web-sockets', () => ({
  send: jest.fn()
}))

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
  state: {
    socketStatus: {}
  },
  mutations: {
    setSocketStatus (state, val) {
      state.socketStatus = val
    }
  },
  actions: {
    updateSidebarStatus: jest.fn()
  },
  getters: {
    socketStatus: (state) => state.socketStatus
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

describe('ListPage.vue', () => {
  let wrapper, vm
  const connectionSend = jest.spyOn(connection, 'send')

  beforeAll(async () => {
    router.push('/')
    await router.isReady()
    wrapper = mount(ListPage, {
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

  test('[COMPUTED] queryParams', async () => {
    await router.push({
      query: { isin: ['INE'] }
    })
    const expected = { isin: ['INE'] }
    expect(vm.queryParams).toEqual(expected)
  })

  test('[METHODS] initializeSubscriber', async () => {
    await router.push({
      query: { isin: ['INE'] }
    })
    vm.initializeSubscriber()
    const request = JSON.stringify({ subscribe: 'INE' })
    expect(connectionSend).toHaveBeenCalledWith(request)
  })

  test('[WATCH] socketStatus call initializeSubscriber', async () => {
    await router.push({
      query: { isin: ['INE'] }
    })
    store.commit('stock/setSocketStatus', true)
    await nextTick()
    const request = JSON.stringify({ subscribe: 'INE' })
    expect(connectionSend).toHaveBeenCalledWith(request)
  })

  test('[WATCH] socketStatus don\'t call initializeSubscriber ', async () => {
    await router.push({
      query: { isin: ['INE'] }
    })
    store.commit('stock/setSocketStatus', false)
    await nextTick()
  })
})
