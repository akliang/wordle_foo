app.component('keyboard-key', {
  props: {
    letterVal: String,
  },
  template: `
    <button 
      class="w-8 h-12 border border-slate-300 dark:border-slate-600 text-black dark:text-white rounded-md m-0.5 md:w-14 md:h-20 touch-manipulation"
      v-bind:value=letterVal
      v-bind:class="colorState"
      @click="placeLetter(letterVal)">
        {{ letterVal }}
    </button>
  `,
  computed: {
    colorState: function() {
      const idx = this.$store.state.gameSettings.alphabetList.indexOf(this.letterVal);
      const nowLetter = this.$store.state.gameSettings.letterParams[idx];

      let output = this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorWhiteDark : this.$store.state.gameSettings.colorWhite;
      if (nowLetter.isGray) {
        output += " ";
        output += this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorGrayDark : this.$store.state.gameSettings.colorGray;
      }
      if (nowLetter.isYellow) {
        output += " ";
        output += this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorYellowDark : this.$store.state.gameSettings.colorYellow;
      }
      if (nowLetter.isGreen) {
        output += " ";
        output += this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorGreenDark : this.$store.state.gameSettings.colorGreen;
      }
      return output;
    }
  },
  methods: {
    placeLetter: function(letterVal) {
      // send question mark to the modal mixin
      if (letterVal == '?') {
        this.questionModal();
        return;
      }

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
  template: `
    <button
      class="w-1/4 h-12 border-none rounded-md bg-sky-600 text-white font-bold mr-2 touch-manipulation dark:bg-sky-400"
      @click="deleteLetter()">
        Delete
    </button>`,
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
  template: `
    <button
      class="w-1/4 h-12 border-none rounded-md bg-sky-600 text-white font-bold touch-manipulation dark:bg-sky-400"
      @click="checkWord()">
        Enter
    </button>`,
})

app.component('keyboard-settings', {
  template: `
    <button
      class="h-12 px-4 border-none rounded-md bg-sky-600 text-white font-bold mr-2 touch-manipulation dark:bg-sky-400"
      @click="settingsModal()">
        <i class="fas fa-cog text-xl"></i>
    </button>`,
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
        v-bind:letter-val="item.letterVal">
      </keyboard-key>
    </div>

    <div class="flex justify-center">
      <keyboard-key v-for="item in rowTwo"
        v-bind:key="item.letterVal"
        v-bind:letter-val="item.letterVal">
      </keyboard-key>
    </div>

    <div class="flex justify-center">
      <keyboard-key v-for="item in rowThree"
        v-bind:key="item.letterVal"
        v-bind:letter-val="item.letterVal">
      </keyboard-key>
    </div>

    <div class="flex justify-center mt-2">
      <keyboard-settings></keyboard-settings>
      <keyboard-delete></keyboard-delete>
      <keyboard-enter></keyboard-enter>
    </div>
  
  `
})
