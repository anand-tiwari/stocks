import { mapGetters } from 'vuex'

import Header from '@/components/Header.vue'
import Stock from '@/components/Stock.vue'
import Sidebar from '@/components/Sidebar.vue'
import connection from '@/utils/web-sockets'

export default {
  name: 'ListPage',
  components: { Header, Stock, Sidebar },
  computed: {
    ...mapGetters('stock', ['socketStatus']),
    queryParams () {
      return this.$route.query
    }
  },
  watch: {
    socketStatus: {
      immediate: true,
      handler (to, from) {
        if (this.socketStatus) {
          this.initializeSubscriber()
        }
      }
    }
  },
  methods: {
    initializeSubscriber () {
      const isin = this.queryParams.isin
      const isinList = Array.isArray(isin) ? isin : [isin]
      isinList && isinList.forEach(isin => {
        connection.send(JSON.stringify({ subscribe: isin }))
      })
    }
  }
}
