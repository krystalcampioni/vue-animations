import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Parent from '@/components/Parent'
import Another from '@/components/Another'
import DataViz from '@/components/DataViz'
import CanvasExample from '@/components/CanvasExample'

Vue.use(Router)

const child = {
  template: '<div class="foo">{{this.$route.params.child}}</div>'
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/another', component: Another },
    { path: '/svgs', component: DataViz },
    { path: '/canvas-example', component: CanvasExample },
    {
      path: '/parent',
      component: Parent,
      children: [
        { path: '/', redirect: '/parent/1' },
        { path: ':child', component: child }
      ]
    }
  ]
})
