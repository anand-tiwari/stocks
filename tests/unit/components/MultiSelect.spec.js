import MultiSelect from '@/components/filters/MultiSelect.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import filterMixin from '@/mixins/filter-mixins'

import { nextTick } from 'vue'

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
  mutations: {
    setIsIn: jest.fn()
  },
  actions: {
    updateIsIn: jest.fn(),
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

describe('MultiSelect.vue', () => {
  let wrapper, vm
  const updateSubscriberListSpy = jest.spyOn(filterMixin.methods, 'updateSubscriberList')

  beforeAll(async () => {
    router.push('/')
    await router.isReady()
    wrapper = mount(MultiSelect, {
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

  test('[METHODS] updateFilter {checked}', () => {
    vm.updateFilter('INS', true)
    expect(updateSubscriberListSpy).toHaveBeenCalled()
  })
  test('[METHODS] updateFilter {unchecked}', () => {
    vm.updateFilter('INS', false)
    expect(updateSubscriberListSpy).toHaveBeenCalled()
  })

  test('[COMPUTED] filteredItems {empty}', () => {
    const result = [
      'DE000BASF111',
      'INE470A01017',
      'DE0005151005'
    ]
    expect(vm.filteredItems).toEqual(result)
  })
  test('[COMPUTED] filteredItems {some search term}', () => {
    const result = [
      'DE000BASF111',
      'INE470A01017',
      'DE0005151005'
    ]
    expect(vm.filteredItems).toEqual(result)
  })

  test('[METHOD] initialize with empty value in route', async () => {
    await router.push({
      query: { isin: [] }
    })
    expect(wrapper.vm.checked).toEqual([])
  })

  test('[METHOD] initialize with multiple value in route', async () => {
    await router.push({
      query: { isin: ['INE', 'INA'] }
    })
    expect(wrapper.vm.checked).toEqual(['INE', 'INA'])
  })

  test('[METHOD] initialize with Single value', async () => {
    await router.push({
      query: { isin: 'INE' }
    })
    await nextTick()
    expect(wrapper.vm.checked).toEqual('INE')
  })

  test('[WATCH] $route.query', async () => {
    await router.push({
      query: { isin: ['INE', 'INA'] }
    })
    expect(wrapper.vm.checked).toEqual(['INE', 'INA'])
  })
})
