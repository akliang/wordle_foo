app.component('keyboard-key', {
  props: {
    letterVal: String,
    letterPos: Array,
    isAlive: Boolean,
    colorVal: {
      type: String,
      default: 'white',
    },
  },
  template: '<button v-bind:value=letterVal class="keyboard-key" @click="advanceGrid()">{{ letterVal }}</button>',
  methods: {
    advanceGrid: function() {
      console.log("currRow is: " + this.$store.state.currRow);
      this.$store.state.currRow += 1;
      // console.log("currCol is: " + currCol);
      // currRow = currRow + 1;
    },
  }
})

app.component('keyboard', {
  props: ['letterParams'],
  template: `
  <div>
    <keyboard-key v-for="item in letterParams" v-bind:key="item.letterVal" v-bind:letter-val="item.letterVal"></keyboard-key>
  </div>
  `
})
