import connection from '@/utils/web-sockets'

export default function createWebSocketPlugin (client = connection) {
  return store => {
    client.onmessage = function (event) {
      const stock = JSON.parse(event.data)
      store.dispatch('stock/getStockInfo', {
        stock
      })
      return false
    }

    client.onopen = function (event) {
      console.log('Successfully connected to the websocket server...')
      store.dispatch('stock/updateSocketStatus', true)
      return false
    }
    client.onclose = function (event) {
      console.log(event)
      return false
    }
  }
}
