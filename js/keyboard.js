app.component('keyboard-key', {
  props: {
    letterVal: String,
    isGray: Boolean,
    isYellow: Boolean,
    isGreen: Boolean,
  },
  template: `
    <button 
      class="w-8 h-8 border border-slate-500 rounded-md mr-1 mb-1"
      v-bind:value=letterVal
      v-bind:class="{ 'bg-gray-400': isGray, 'bg-yellow-500': isYellow, 'bg-green-500': isGreen }"
      @click="placeLetter(letterVal)">
        {{ letterVal }}
    </button>
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
  template: '<button class="w-1/4 h-8 border border-slate-500 rounded-md mr-2 bg-red-400" @click="deleteLetter()">Delete</button>',
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
  template: '<button class="w-1/4 h-8 border border-slate-500 rounded-md bg-blue-500" @click="checkWord()">Enter</button>',
})

app.component('keyboard', {
  props: ['letterParams'],
  computed: {
    rowOne: function() {
      return this.$store.state.gameSettings.letterParams.slice(0,10);
    },
    rowTwo: function() {
      return this.$store.state.gameSettings.letterParams.slice(10,19);
    },
    rowThree: function() {
      return this.$store.state.gameSettings.letterParams.slice(19,27);
    }
  },
  template: `
    <div class="flex justify-center">
      <keyboard-key v-for="item in rowOne"
        v-bind:key="item.letterVal"
        v-bind:letter-val="item.letterVal"
        v-bind:is-gray="item.isGray"
        v-bind:is-yellow="item.isYellow"
        v-bind:is-green="item.isGreen">
      </keyboard-key>
    </div>

    <div class="flex justify-center">
      <keyboard-key v-for="item in rowTwo"
        v-bind:key="item.letterVal"
        v-bind:letter-val="item.letterVal"
        v-bind:is-gray="item.isGray"
        v-bind:is-yellow="item.isYellow"
        v-bind:is-green="item.isGreen">
      </keyboard-key>
    </div>

    <div class="flex justify-center">
      <keyboard-key v-for="item in rowThree"
        v-bind:key="item.letterVal"
        v-bind:letter-val="item.letterVal"
        v-bind:is-gray="item.isGray"
        v-bind:is-yellow="item.isYellow"
        v-bind:is-green="item.isGreen">
      </keyboard-key>
    </div>

    <div class="flex justify-center mt-2">
      <keyboard-delete></keyboard-delete>
      <keyboard-enter></keyboard-enter>
    </div>
  
  `
})
