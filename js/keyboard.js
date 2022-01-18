app.component('keyboard-key', {
  props: {
    letterVal: String,
    colorVal: Number,
  },
  computed: {
    colorCheck() {
      switch(this.colorVal) {
        case 0: return "white";
        case 1: return "gray";
        case 2: return "yellow";
        case 3: return "green";
      }
    }
  },
  template: '<button v-bind:value=letterVal class="keyboard-key" @click="placeLetter(letterVal)" v-bind:class="colorCheck">{{ letterVal }}</button>',
  methods: {
    placeLetter: function(letterVal) {
      if (this.$store.state.gameSettings.currCol == 5) {
        // if end of row already, do nothing
        return false;
      } else {      
        // place the letter on the grid
        this.$store.state.gameSettings.gridVals[this.$store.state.gameSettings.currRow][this.$store.state.gameSettings.currCol] = letterVal;
        // move the currCol pointers to the next letter box
        this.$store.state.gameSettings.currCol += 1;
      }
    },
  }
})

app.component('keyboard-delete', {
  template: '<button class="keyboard-key" @click="deleteLetter()">Delete</button>',
  methods: {
    deleteLetter: function() {
      if (this.$store.state.gameSettings.currCol == 0) {
        // if we're at beginning of row, do nothing
        return false;
      } else {
        // move pointer back to previous square
        this.$store.state.gameSettings.currCol -= 1;
        // set that square to blank
        this.$store.state.gameSettings.gridVals[this.$store.state.gameSettings.currRow][this.$store.state.gameSettings.currCol] = '';
        
      }
    }
  }
})

app.component('keyboard-enter', {
  template: '<button class="keyboard-key" @click="checkWord()">Enter</button>',
})

app.component('keyboard', {
  props: ['letterParams'],
  template: `
  <div>
    <keyboard-key v-for="item in this.$store.state.gameSettings.letterParams" v-bind:key="item.letterVal" v-bind:letter-val="item.letterVal" class="white" v-bind:class="{ gray: item.isGray, yellow: item.isYellow, green: item.isGreen }"></keyboard-key>
    <keyboard-delete></keyboard-delete>
    <keyboard-enter></keyboard-enter>
  </div>
  `
})
