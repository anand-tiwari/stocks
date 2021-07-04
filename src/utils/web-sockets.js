const connection = new WebSocket('ws://159.89.15.214:8080/')

connection.onmessage = function (event) {
  self.updateStocks(event.data)
  return false
}

connection.onopen = function (event) {
  console.log('Successfully connected to the websocket server...')
  self.initialize()
  return false
}
connection.onclose = function (event) {
  console.log(event)
  return false
}

export default connection
