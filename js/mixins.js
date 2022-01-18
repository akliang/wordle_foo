app.mixin({
  methods: {
    checkWord: function() {
      // some convenience variables
      const currRow = this.$store.state.currRow;
      const currLetters = this.$store.state.gridVals[currRow];
      const theWord = this.$store.state.theWord;
      // const theWordArray = this.$store.state.theWord.split('');
      

      // initialize variables
      let correctLetter = new Array(5).fill(0);
      let foundLetter = new Array(5).fill(0);
      // let nowWord = '';

      
      // step through every submitted letter
      currLetters.forEach((element,i) => {

        // check absolute match
        if (element === theWord.charAt(i)) {
          correctLetter[i] = 1;
        }

        // check fuzzy match
        else {
          if (theWord.split('').indexOf(element)) {
            foundLetter[i] = 1;
          }
        }

        // color the grid
        if (correctLetter[i]) {
          this.$store.state.gridColors[currRow][i] = 3;
        } else if (foundLetter[i]) {
          this.$store.state.gridColors[currRow][i] = 2;
        } else {
          this.$store.state.gridColors[currRow][i] = 1;
        }

        // color the keyboard
      });

      // check for win-loss
      console.log(correctLetter);
      if (correctLetter.every((cl) => cl == 1)) {
        console.log("win!");
      } else if (currRow == 5) {
        console.log("loss...");
      } else {
        this.$store.state.currRow += 1;
        this.$store.state.currCol = 0;
      }
    
    }
  }
})