import { mapGetters } from 'vuex'
import filterMixins from '@/mixins/filter-mixins'

export default {
  name: 'multi-select',
  data () {
    return {
      checked: [],
      search: ''
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler (to, from) {
        this.checked = this.$route.query.isin
      }
    }
  },
  mixins: [filterMixins],
  computed: {
    ...mapGetters('stock', ['IsIns']),
    filteredItems () {
      const searchReg = new RegExp(this.search, 'i')
      return this.IsIns.filter((item) => searchReg.test(item))
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      const isin = this.$route.query.isin || []
      this.checked = Array.isArray(isin) ? isin : [isin]
    },
    updateFilter (isin, checked) {
      this.updateSubscriberList(isin, checked)
    }
  }
}
