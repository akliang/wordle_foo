app.component('letter-square', {
  props: ['myRow','myCol'],
  computed: {
    colorCheck() {
      if (this.$store.state.gameSettings.darkMode) {
        switch(this.$store.state.gameSettings.gridColors[this.myRow][this.myCol]) {
          case 0: return this.$store.state.gameSettings.colorWhiteDark;
          case 1: return this.$store.state.gameSettings.colorGrayDark;
          case 2: return this.$store.state.gameSettings.colorYellowDark;
          case 3: return this.$store.state.gameSettings.colorGreenDark;
        }
      } else {
        switch(this.$store.state.gameSettings.gridColors[this.myRow][this.myCol]) {
          case 0: return this.$store.state.gameSettings.colorWhite;
          case 1: return this.$store.state.gameSettings.colorGray;
          case 2: return this.$store.state.gameSettings.colorYellow;
          case 3: return this.$store.state.gameSettings.colorGreen;
        }
      }
      
    }
  },
  template: `
    <div
      class="w-1/6 h-full border border-slate-300 dark:border-slate-600 rounded flex mr-2 last:mr-0 justify-center items-center text-2xl touch-manipulation dark:text-slate-200"
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
    <div v-for="n in 6" class="flex h-1/6 pt-2 justify-center">
      <letter-row :my-row="n-1"></letter-row>
    </div>
  </div>`
})