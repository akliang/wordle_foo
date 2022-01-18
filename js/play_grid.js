app.component('letter-square', {
  props: ['myRow','myCol'],
  computed: {
    colorCheck() {
      switch(this.$store.state.gameSettings.gridColors[this.myRow][this.myCol]) {
        case 0: return "white";
        case 1: return "gray";
        case 2: return "yellow";
        case 3: return "green";
      }
    }
  },
  template: '<div class="letter-square" v-bind:class="colorCheck">{{ this.$store.state.gameSettings.gridVals[myRow][myCol] }}</div>'
})

app.component('letter-row', {
  props: ['myRow'],
  template: `
  <span class="letter-row">
    <div v-for="n in 5">
      <letter-square :my-row="myRow" :my-col="n-1"></letter-square>
    </div>
  </span>
  `
})

app.component('play-grid', {
  template: `
  <span>
    <template v-for="n in 6">
      <letter-row :my-row="n-1"></letter-row>
    </template>
  </span>
  `
})