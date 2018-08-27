<template lang='pug'>
  div
    svg.chart(xmlns='http://www.w3.org/2000/svg' viewBox='9 -1 200 100' preserveAspectRatio='xMidYMid meet')
      defs
        linearGradient#linear.chart__gradient(x1='0%' y1='0%' x2='100%' y2='0%' gradientTransform='rotate(90)')
          stop(offset='0%')
          stop(offset='100%')

      g(fill='none' fill-rule='evenodd', stroke-width='.5' stroke-linecap='square')
        line(
          v-for='n in numberOfPoints+1'
          stroke='url(#linear)'
          :x1='n * 10'
          :y1='0'
          :x2='n * 10.0001'
          y2='100'
          class='chart__grid-lines'
        )
        line( :x1='(numberOfPoints+1) * 10' x2='10' y1='0' y2='0'  class='chart__grid-baseline')
      g
        circle(:cx='line.from[0]-20' :cy='line.from[1]+50' r='1' v-for='line in lines' class='chart__ghost chart__ghost--dots')
        line(
          :key='"line-key" + line.from[0] + line.to[1]'
          v-for='line in lines'
          :x1='line.from[0]-20'
          :y1='line.from[1]+50'
          :x2='line.to[0]-20'
          :y2='line.to[1]+50'
          class='chart__ghost chart__ghost--lines'
        )
        line(
          :key='line.from[0] + line.to[0]'
          v-for='line in lines'
          :x1='line.from[0]'
          :y1='line.from[1]'
          :x2='line.to[0]'
          :y2='line.to[1]'
          class='chart__lines'
        )
        circle(:cx='line.from[0]' :cy='line.from[1]' r='1' v-for='line in lines' class='chart__dots')

        text(v-for='line in lines' :x='line.from[0]' :y='100 - line.from[1]' fill='white' class='chart__text' transform='scale(1 -1)' )
          | {{ line.from[1].toFixed() }}
    button(@click='newSet') New data set
</template>

<script>
import { TweenLite, Elastic } from 'gsap'

export default {
  data () {
    return {
      points: []
    }
  },

  props: {
    numberOfPoints: {
      type: Number,
      default: 25
    }
  },

  computed: {
    lines () {
      const temp = []

      this.points.map((i, index) => {
        if (index - 1 >= 0) {
          temp.push({
            from: [index * 10, this.points[index - 1]],
            to: [index * 10 + 10, this.points[index]]
          })
        }
      })

      return temp
    }
  },

  methods: {
    generatePoints () {
      const temp = []
      let n = 0
      while (n < this.numberOfPoints + 1) {
        const randomNumber = Math.floor(Math.random() * (50 - 20 + 1)) + 20
        temp.push(randomNumber)
        n++
      }
      return temp
    },

    newSet () {
      const previousPoints = this.points.slice()
      const newPoints = this.generatePoints()

      TweenLite.defaultEase = Elastic.easeOut.config(1, 0.3)
      TweenLite.to(previousPoints, 2, newPoints)

      newPoints.onUpdate = () => {
        previousPoints.forEach((i, index) => {
          this.$set(this.points, index, i)
        })
      }
    }
  },

  mounted () {
    this.points = this.generatePoints()
  }
}
</script>
