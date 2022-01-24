app.mixin({
  methods: {
    checkWord: function() {
      // make sure 5 letters are submitted
      if (this.$store.state.gameSettings.currCol < 5) {
        this.$store.state.gameSettings.messageColor = "";
        this.$store.state.gameSettings.message = this.$store.state.gameSettings.messageNotEnoughLetters;
        return;
      }

      // set up some convenience variables
      const currRow = this.$store.state.gameSettings.currRow;
      const currLetters = this.$store.state.gameSettings.gridVals[currRow];
      const theWord = this.$store.state.gameSettings.theWord;
      const allWords = this.$store.state.wordList.words;

      // check for staging loophole
      if (this.$store.state.gameSettings.isStaging) {
        if (currLetters.join('') == "LLLLL") {
          this.$store.state.gameSettings.message = this.$store.state.gameSettings.messageYouLose + '"' + this.$store.state.gameSettings.theWord + '".';
          this.$store.state.gameSettings.playAgain = true;
          return;
        }
      }

      // first check that the submitted word is a valid word
      const nowWord = currLetters.join('').toLowerCase();
      if (allWords.indexOf(nowWord) == -1) {
        this.$store.state.gameSettings.messageColor = "";
        this.$store.state.gameSettings.message = this.$store.state.gameSettings.messageNotValidWord;
        return;
      }

      
      // step through every submitted letter
      let correctLetter = new Array(5).fill(0);
      let foundLetter = new Array(5).fill(0);
      currLetters.forEach((element,i) => {

        // check absolute match
        if (element === theWord.charAt(i)) {
          correctLetter[i] = 1;
        }

        // check fuzzy match
        else {
          if (theWord.split('').indexOf(element) != -1) {
            foundLetter[i] = 1;
          }
        }

        // color the grid
        if (correctLetter[i]) {
          this.$store.state.gameSettings.gridColors[currRow][i] = 3;
        } else if (foundLetter[i]) {
          this.$store.state.gameSettings.gridColors[currRow][i] = 2;
        } else {
          this.$store.state.gameSettings.gridColors[currRow][i] = 1;
        }


        // color the keyboard
        let idx = this.$store.state.gameSettings.alphabetList.indexOf(element);
        if (correctLetter[i]) {
          this.$store.state.gameSettings.letterParams[idx].isGreen = true;
        } else if (foundLetter[i]) {
          this.$store.state.gameSettings.letterParams[idx].isYellow = true;
        } else {
          this.$store.state.gameSettings.letterParams[idx].isGray = true;
        }
      });


      // check for win-loss
      if (correctLetter.every((cl) => cl == 1)) {
        this.$store.state.gameSettings.message = this.$store.state.gameSettings.messageYouWin;
        this.$store.state.gameSettings.playAgain = true;
      } else if (currRow == 5) {
        this.$store.state.gameSettings.message = this.$store.state.gameSettings.messageYouLose + this.$store.state.gameSettings.theWord + "\".";
        this.$store.state.gameSettings.playAgain = true;
      } else {
        this.$store.state.gameSettings.currRow += 1;
        this.$store.state.gameSettings.currCol = 0;
        this.$store.state.gameSettings.message = '';
      }
    
    },
    
    initializeGame: function() {
      // perform a deep-clone of the default values
      this.$store.state.gameSettings.letterParams = JSON.parse(JSON.stringify(this.$store.state.gameSettings.defaultLetterParams));
      this.$store.state.gameSettings.gridVals = JSON.parse(JSON.stringify(this.$store.state.gameSettings.defaultGridVals));
      this.$store.state.gameSettings.gridColors = JSON.parse(JSON.stringify(this.$store.state.gameSettings.defaultGridColors));
      this.$store.state.gameSettings.currRow = 0;
      this.$store.state.gameSettings.currCol = 0;
      this.$store.state.gameSettings.message = 'Welcome to Wordle!';
      this.$store.state.gameSettings.playAgain = false;

      const maxNum = this.$store.state.wordList.maxNum;
      const randNum = Math.floor(Math.random() * maxNum);
      this.$store.state.gameSettings.theWord = this.$store.state.wordList.words[randNum].toUpperCase();

      // special debug case for development
      if (location.href.match("staging")) {
        this.$store.state.gameSettings.isStaging = true; 
        this.$store.state.gameSettings.theWord = 'HELLO';
      }
    },

    questionModal: function() {
      this.$store.state.gameSettings.questionModal = !this.$store.state.gameSettings.questionModal;
    },

    settingsModal: function() {
      this.$store.state.gameSettings.settingsModal = !this.$store.state.gameSettings.settingsModal;
    },

    darkMode: function() {
      // this.$store.state.gameSettings.darkMode = !this.$store.state.gameSettings.darkMode;
      if (this.$store.state.gameSettings.darkMode) {
        this.$store.state.gameSettings.darkMode = false;
        document.documentElement.classList.remove('dark');
      } else {
        this.$store.state.gameSettings.darkMode = true;
        document.documentElement.classList.add('dark');
      }
    },
  }
});
