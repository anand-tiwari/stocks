import { mapActions, mapGetters } from 'vuex'
import filterMixins from '@/mixins/filter-mixins'

export default {
  name: 'Header',
  data () {
    return {
      searchTerm: ''
    }
  },
  mixins: [filterMixins],
  computed: {
    ...mapGetters('stock', ['visibleSidebar'])
  },
  methods: {
    ...mapActions('stock', ['updateIsIn', 'updateSidebarStatus']),
    onInput (event) {
      const isin = this.searchTerm
      this.updateIsIn({ data: event.target.value })
      this.updateRouteQuery(isin, true)
      this.updateSubscribe(isin)
      this.searchTerm = ''
    },
    openSidebar () {
      this.updateSidebarStatus(true)
    }
  }
}
