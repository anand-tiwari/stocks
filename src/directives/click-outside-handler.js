export const clickOutside = {
  mounted (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!event.target.classList.contains('open-sidebar') &&
          !(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
