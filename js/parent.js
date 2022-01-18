app.component('parent', {
  mounted: function() {
    const maxNum = this.$store.state.wordList.maxNum;
    const randNum = Math.floor(Math.random() * maxNum);
    this.$store.state.gameSettings.theWord = this.$store.state.wordList.words[randNum].toUpperCase();
  },
  template: `
    <div>
      <play-grid></play-grid>
      <messages></messages>
      <keyboard></keyboard>
    </div>
  `
})