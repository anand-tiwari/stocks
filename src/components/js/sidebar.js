import { mapActions, mapGetters } from 'vuex'
import MultiSelect from '@/components/filters/MultiSelect.vue'
import { clickOutside } from '@/directives/click-outside-handler'

export default {
  components: { MultiSelect },
  name: 'Sidebar',
  directives: {
    clickOutside
  },
  computed: {
    ...mapGetters('stock', ['visibleSidebar'])
  },
  methods: {
    ...mapActions('stock', ['updateSidebarStatus']),
    hideSidebar () {
      this.visibleSidebar && this.updateSidebarStatus(false)
    }
  }
}
