const state = () => ({
  IsIns: [
    'DE000BASF111',
    'INE470A01017',
    'DE0005151005'
  ],
  stocks: {},
  visibleSidebar: false,
  socketStatus: false,
  unSubscribed: []
})

const mutations = {
  setStockInfo: (state, { stock, remove = false }) => {
    if (remove || state.unSubscribed.includes(stock.isin)) {
      const olderData = state.stocks
      delete olderData[stock.isin]
      state.stocks = Object.assign({}, { ...olderData })
    } else {
      state.stocks = Object.assign({}, state.stocks, { [stock.isin]: stock })
    }
  },
  setIsIn: (state, isin) => {
    state.IsIns = [...new Set([...state.IsIns, isin])]
  },
  setSidebarStatus (state, val) {
    state.visibleSidebar = val
  },
  setSocketStatus (state, val) {
    state.socketStatus = val
  },
  setUnSubscribed (state, { isin, remove = false }) {
    if (remove) {
      state.unSubscribed = state.unSubscribed.filter(item => item !== isin)
      return
    }
    state.unSubscribed = [...new Set([...state.unSubscribed, isin])]
  }
}

const actions = {
  getStockInfo ({ commit }, { stock, remove = false }) {
    commit('setStockInfo', { stock, remove })
  },
  updateSocketStatus ({ commit }, data) {
    commit('setSocketStatus', data)
  },
  updateIsIn ({ commit }, { data }) {
    commit('setIsIn', data)
  },
  updateSidebarStatus ({ commit }, val) {
    commit('setSidebarStatus', val)
  },
  updateUnSubscribed ({ commit }, { data, success, fail }) {
    commit('setUnSubscribed', { ...data })
    success && success({ ...data })
  }
}

const getters = {
  IsIns: state => state.IsIns,
  stocks: state => state.stocks,
  visibleSidebar: state => state.visibleSidebar,
  socketStatus: state => state.socketStatus
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
