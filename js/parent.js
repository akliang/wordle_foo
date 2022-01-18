app.component('parent', {
  mounted: function() {
    const maxNum = this.$store.state.wordList.maxNum;
    const randNum = Math.floor(Math.random() * maxNum);
    console.log(this.$store.state.wordList.words[randNum]);
    this.$store.state.gameSettings.theWord = this.$store.state.wordList.words[randNum];
  },
  template: `
    <div>
      <play-grid></play-grid>
      <keyboard></keyboard>
      <debug-display></debug-display>
    </div>
  `
})