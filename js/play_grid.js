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
  template: `
    <div
      class="w-1/6 h-full border border-slate-500 rounded flex-initial mr-2 last:mr-0 justify-center items-center"
      v-bind:class="colorCheck">
        {{ this.$store.state.gameSettings.gridVals[myRow][myCol] }}
    </div>`
})

app.component('letter-row', {
  props: ['myRow'],
  template: `
    <template v-for="n in 5">
      <letter-square :my-row="myRow" :my-col="n-1"></letter-square>
    </template>`
})

app.component('play-grid', {
  template: `
  <div class="h-full">
    <div v-for="n in 6" class="flex h-1/6 pt-6 justify-center">
      <letter-row :my-row="n-1"></letter-row>
    </div>
  </div>`
})