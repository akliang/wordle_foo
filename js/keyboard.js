app.component('keyboard-key', {
  props: {
    letterVal: String,
    letterBreak: Boolean,
    isGray: Boolean,
    isYellow: Boolean,
    isGreen: Boolean,
  },
  template: `
    <span>
      <button 
        v-bind:value=letterVal
        class="keyboard-key white"
        v-bind:class="{ gray: isGray, yellow: isYellow, green: isGreen }"
        @click="placeLetter(letterVal)">
          {{ letterVal }}
      </button>
      <br v-if="letterBreak">
    </span>
  `,
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
  <div class="keyboard-wrapper">
    <keyboard-key v-for="item in this.$store.state.gameSettings.letterParams" v-bind:key="item.letterVal" v-bind:letter-val="item.letterVal" v-bind:is-gray="item.isGray" v-bind:is-yellow="item.isYellow" v-bind:is-green="item.isGreen" v-bind:id="'keyboard-' + item.letterVal" v-bind:letter-break="item.letterBreak"></keyboard-key>
    <br>
    <keyboard-delete id="keyboard-delete"></keyboard-delete>
    <keyboard-enter id="keyboard-enter"></keyboard-enter>
  </div>
  `
})
