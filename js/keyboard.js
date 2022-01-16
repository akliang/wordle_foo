Vue.component('keyboard-key', {
  props: {
    letterVal: String,
    letterPos: Array,
    isAlive: Boolean,
    colorVal: {
      type: String,
      default: 'white',
    }
  },
  template: '<button v-bind:value=letterVal class="keyboard-key">{{ letterVal }}</button>'
})

Vue.component('keyboard', {
  props: ['letterParams'],
  template: `
  <div>
    <keyboard-key v-for="item in letterParams" v-bind:key="item.letterVal" v-bind:letter-val="item.letterVal"></keyboard-key>
  </div>
  `
})