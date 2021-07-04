import { mapGetters } from 'vuex'
const headerlist = [
  'ISIN',
  'PRICE',
  'BID',
  'ASK'
]
export default {
  name: 'Stock',
  data () {
    return {
      headerlist: headerlist
    }
  },
  computed: {
    ...mapGetters('stock', ['stocks'])
  }
}
