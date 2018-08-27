<template lang="pug">
 div
  h2 Nested routes
  ul.menu.menu--vertical
    router-link.menu__item(
      tag='li'
      active-class='menu__item--active'
      to='/parent/1'
    )
      a Child 1
    router-link.menu__item(
      tag='li'
      active-class='menu__item--active'
      to='/parent/2'
    )
      a Child 2
    router-link.menu__item(
      tag='li'
      active-class='menu__item--active'
      to='/parent/3'
    )
      a Child 3
  .child-wrapper
    transition(:name='transitionName')
      router-view.child-view(:key='$route.path')
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'slide-up'
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    this.transitionName = to.params.child < from.params.child ? 'slide-down' : 'slide-up'
    next()
  }
}
</script>
