app.mixin({
  methods: {
    checkWord: function() {
      // make sure 5 letters are submitted
      if (this.$store.state.gameSettings.currCol < 5) {
        console.log("Less than 5 letters submitted.");
        return;
      }

      // set up some convenience variables
      const currRow = this.$store.state.gameSettings.currRow;
      const currLetters = this.$store.state.gameSettings.gridVals[currRow];
      const theWord = this.$store.state.gameSettings.theWord;
      const allWords = this.$store.state.wordList.words;


      // first check that the submitted word is a valid word
      const nowWord = currLetters.join('');
      if (allWords.indexOf(nowWord) == -1) {
        console.log("Not a valid word");
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
          this.$store.state.gameSettings.letterParams[idx].isGreen = 1;
        } else if (foundLetter[i]) {
          // console.log(foundLetter);
          // console.log(i);
          // console.log(foundLetter[i]);
          this.$store.state.gameSettings.letterParams[idx].isYellow = 1;
        } else {
          this.$store.state.gameSettings.letterParams[idx].isGray = 1;
        }
      });


      // check for win-loss
      if (correctLetter.every((cl) => cl == 1)) {
        console.log("win!");
      } else if (currRow == 5) {
        console.log("loss...");
      } else {
        this.$store.state.gameSettings.currRow += 1;
        this.$store.state.gameSettings.currCol = 0;
      }
    
    }
  }
})