app.component('parent', {
  created: function() {
    this.initializeGame();
  },
  template: `
    <div>
      <play-grid></play-grid>
      <messages></messages>
      <keyboard></keyboard>
    </div>
  `
})