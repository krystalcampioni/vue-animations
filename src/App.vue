<template lang="pug">
 #app
  h1.title
    | P a g e
    br
    br
    | T r a n s i t i o ns
  .page
    ul.menu.view
      router-link.menu__item(
        tag='li'
        active-class='menu__item--active'
        to='/', exact
      )
        a home
      router-link.menu__item(
        tag='li'
        active-class='menu__item--active'
        to='/parent/'
      )
        a parent
      router-link.menu__item(
        tag='li'
        active-class='menu__item--active'
        to='/another'
      )
        a another
    transition(name='fade', mode='out-in')
      router-view.view
</template>

<style lang="scss">
  @import '@/scss/app.scss';
</style>
