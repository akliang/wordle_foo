app.component('keyboard-key', {
  props: {
    letterVal: String,
  },
  computed: {
    colorState: function() {
      const idx = this.$store.state.gameSettings.alphabetList.indexOf(this.letterVal);
      const nowLetter = this.$store.state.gameSettings.letterParams[idx];
      let output = '';

      if (nowLetter.isGreen) {
        output = this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorGreenDark : this.$store.state.gameSettings.colorGreen;
      } else if (nowLetter.isYellow) {
        output = this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorYellowDark : this.$store.state.gameSettings.colorYellow;
      } else if (nowLetter.isGray) {
        output = this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorGrayDark : this.$store.state.gameSettings.colorGray;
      } else {
        output = this.$store.state.gameSettings.darkMode ? this.$store.state.gameSettings.colorWhiteDark : this.$store.state.gameSettings.colorWhite;
      }

      return output;
    },
    makeID: function() {
      if (this.letterVal == "?") {
        return "key-question";
      } else {
        return "key-" + this.letterVal;
      }
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
  },
  template: `
    <button 
      class="w-8 h-10 border border-slate-300 dark:border-slate-500 text-black dark:text-white rounded-md m-0.5 md:w-14 md:h-20 touch-manipulation"
      v-bind:value=letterVal
      v-bind:class="colorState"
      v-bind:id="makeID"
      @click="placeLetter(letterVal)">
        {{ letterVal }}
    </button>
  `,
});

app.component('keyboard-delete', {
  template: `
    <button
      class="w-1/4 h-10 border-none rounded-md bg-sky-600 text-white font-bold mr-2 touch-manipulation dark:bg-sky-400"
      id="key-delete"
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
});

app.component('keyboard-enter', {
  template: `
    <button
      class="w-1/4 h-10 border-none rounded-md bg-sky-600 text-white font-bold touch-manipulation dark:bg-sky-400"
      id="key-enter"
      @click="checkWord()">
        Enter
    </button>`,
});

app.component('keyboard-settings', {
  template: `
    <button
      class="h-10 px-4 border-none rounded-md bg-sky-600 text-white font-bold mr-2 touch-manipulation dark:bg-sky-400"
      id="key-settings"
      @click="settingsModal()">
        <i class="fas fa-cog text-xl"></i>
    </button>`,
});

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
});
