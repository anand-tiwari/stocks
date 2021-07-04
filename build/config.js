const onProxyResHandler = function (proxyResponse) {
  if (proxyResponse && proxyResponse.headers['set-cookie']) {
    const cookies = proxyResponse.headers['set-cookie'].map(cookie =>
      cookie.replace(/; secure/gi, '')
    )
    proxyResponse.headers['set-cookie'] = cookies
  }
}

const onProxyReqHandler = function (proxyReq) {
  proxyReq.setHeader('accept-encoding', 'gzip;q=0,deflate,sdch')
}

module.exports = {
  development: {
    publicPath: '/',
    port: 10020
  },
  staging: {
    publicPath: '/',
    port: 10020,
    proxyTable: {
      '/backend-path': {
        target: 'backend-host-ip',
        ws: true,
        changeOrigin: true,
        onProxyRes: onProxyResHandler
      }
    }
  },
  production: {
    publicPath: '/'
  }
}
