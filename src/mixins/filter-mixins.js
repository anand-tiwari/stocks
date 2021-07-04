import connection from '@/utils/web-sockets'
import { mapActions } from 'vuex'

export default {
  name: 'filterMixins',
  computed: {
    queryParams () {
      return this.$route.query
    }
  },
  methods: {
    ...mapActions('stock', ['getStockInfo', 'updateUnSubscribed']),
    updateSubscriberList (isin, checked) {
      this.updateUnSubscribed({
        data: { isin: isin, remove: checked },
        success: this.successSubscribed
      })
    },
    successSubscribed ({ isin, remove }) {
      this.updateRouteQuery(isin, remove)
      this.updateSubscribe(isin, remove)
    },
    updateRouteQuery (item, checked) {
      const isIn = this.queryParams.isin || []
      const params = Array.isArray(isIn) ? isIn : [isIn]
      let queryParams = []
      if (checked) {
        queryParams = [...params, item]
      } else {
        queryParams = params.filter(i => i !== item)
      }
      const unique = Array.from(new Set(queryParams))
      this.$router.push({
        query: { isin: [...unique] }
      })
    },
    updateSubscribe (isin, subscribe = true) {
      const eventType = subscribe ? 'subscribe' : 'unsubscribe'
      connection.send(JSON.stringify({ [eventType]: isin }))
      if (!subscribe) {
        this.removeStocks(isin, subscribe)
      }
    },
    removeStocks (isIn) {
      this.getStockInfo({
        stock: { isin: isIn },
        remove: true
      })
    }
  }
}
