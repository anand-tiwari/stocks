module.exports = {
  api: {
    base_path: '',
    product: '/backend-api-path'
  },
  getApiPath: function (apiPath) {
    return this.api.base_path + apiPath
  }
}
